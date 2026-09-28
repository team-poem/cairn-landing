"""보호된 main에서 실제 prune 워크플로가 봇 브랜치를 강제 push 없이 재사용하는지 검사."""
import os
from pathlib import Path
import subprocess
import tempfile
import textwrap
import unittest

WORKFLOW = Path(__file__).resolve().parents[1] / '.github/workflows/harness-check.yml'


class PruneWorkflowTest(unittest.TestCase):
    def test_repeated_prune_preserves_history_and_reuses_pr(self):
        script = textwrap.dedent(WORKFLOW.read_text().split('        run: |\n')[-1])
        self.assertNotIn('git push -q -f', script)
        self.assertNotIn('--force', script)
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            env = {**os.environ, 'GIT_CONFIG_NOSYSTEM': '1', 'GIT_CONFIG_GLOBAL': '/dev/null'}
            for key in ('GIT_DIR', 'GIT_WORK_TREE', 'GITHUB_HEAD_REF', 'CLAUDE_PROJECT_DIR'):
                env.pop(key, None)

            def git(cwd, *args):
                result = subprocess.run(['git', '-C', str(cwd), *args], env=env,
                                        text=True, capture_output=True, check=True)
                return result.stdout.strip()

            remote = root / 'remote.git'
            git(root, 'init', '--bare', '-b', 'main', str(remote))
            seed = root / 'seed'
            git(root, 'clone', str(remote), str(seed))
            git(seed, 'config', 'user.name', 'test')
            git(seed, 'config', 'user.email', 'test@example.invalid')
            (seed / 'scripts').mkdir()
            # prune 본체는 upstream tests가 검사한다. 여기서는 workflow의 배포 경로를 검사한다.
            (seed / 'scripts/collab.sh').write_text('git rm collab/active/*/claim.md\n')
            (seed / 'app.txt').write_text('keep this application content\n')
            first = seed / 'collab/active/first/claim.md'
            first.parent.mkdir(parents=True)
            first.write_text('merged claim\n')
            git(seed, 'add', '.')
            git(seed, 'commit', '-m', 'seed')
            git(seed, 'push', 'origin', 'main')

            protected = remote / 'hooks/update'
            protection = '#!/bin/sh\n[ "$1" != refs/heads/main ]\n'
            protected.write_text(protection)
            protected.chmod(0o755)
            fakebin = root / 'bin'
            fakebin.mkdir()
            gh = fakebin / 'gh'
            gh.write_text('''#!/bin/sh
printf '%s\\n' "$*" >> "$TEST_GH_CALLS"
case "$1 $2" in
  'pr list') [ ! -f "$TEST_PR" ] || echo 1 ;;
  'pr create') touch "$TEST_PR" ;;
esac
exit 0
''')
            gh.chmod(0o755)
            env.update(PATH=str(fakebin) + os.pathsep + env['PATH'],
                       TEST_PR=str(root / 'pr'), TEST_GH_CALLS=str(root / 'calls'))
            previous = None
            for iteration in range(2):
                checkout = root / f'run-{iteration}'
                git(root, 'clone', str(remote), str(checkout))
                result = subprocess.run(['bash', '-e', '-c', script], cwd=checkout,
                                        env=env, text=True, capture_output=True)
                self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
                branch = 'refs/heads/chore/collab-prune'
                current = git(remote, 'rev-parse', branch)
                if previous:
                    git(remote, 'merge-base', '--is-ancestor', previous, current)
                    self.assertIn('기존 PR #1 갱신', result.stdout)
                self.assertEqual(git(remote, 'show', branch + ':app.txt'), 'keep this application content')
                self.assertEqual(git(remote, 'ls-tree', '-r', '--name-only', branch, '--', 'collab/active'), '')
                previous = current
                if iteration == 0:
                    protected.unlink()
                    second = seed / 'collab/active/second/claim.md'
                    second.parent.mkdir(parents=True)
                    second.write_text('another merged claim\n')
                    git(seed, 'add', '.')
                    git(seed, 'commit', '-m', 'next main change')
                    git(seed, 'push', 'origin', 'main')
                    protected.write_text(protection)
                    protected.chmod(0o755)
            calls = (root / 'calls').read_text().splitlines()
            self.assertEqual(sum(line.startswith('pr create ') for line in calls), 1)
            self.assertEqual(sum(line.startswith('pr list ') for line in calls), 2)
            self.assertEqual(git(remote, 'for-each-ref', '--format=%(refname:short)', 'refs/heads/chore'), 'chore/collab-prune')


if __name__ == '__main__':
    unittest.main()
