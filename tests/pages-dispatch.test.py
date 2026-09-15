"""배포 판단 셸을 그대로 실행해 GitHub 응답 경계 조건을 검사한다."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import textwrap
import unittest

WORKFLOW = Path(__file__).resolve().parents[1] / '.github/workflows/pages-dispatch.yml'
LATEST = 'a' * 40
OLDER = 'b' * 40


def source_script():
    content = WORKFLOW.read_text()
    # source 단계의 실제 run 블록을 실행한다. 테스트용 동작 복제 없음.
    section = content.split('id: source\n', 1)[1]
    return textwrap.dedent(section.split('run: |\n', 1)[1].split('      - name:', 1)[0])


class SourceGateTests(unittest.TestCase):
    def check_gate(self, event, verified, comparison=None, latest=LATEST):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            gh = root / 'gh'
            gh.write_text('#!/bin/sh\ncase "$2" in\n  */commits/main) printf "%s\\n" "$MOCK_LATEST" ;;\n  */compare/*) printf "%s\\n" "$MOCK_COMPARISON" ;;\n  *) exit 2 ;;\nesac\n')
            gh.chmod(0o700)
            env = dict(os.environ, PATH=folder + os.pathsep + os.environ['PATH'],
                       REPOSITORY='team-poem/cairn-landing', VERIFIED_SHA=verified,
                       EVENT_NAME=event, MOCK_LATEST=latest,
                       MOCK_COMPARISON=json.dumps(comparison or {}),
                       GITHUB_OUTPUT=str(root / 'output'), GITHUB_STEP_SUMMARY=str(root / 'summary'))
            result = subprocess.run(['bash', '-e', '-o', 'pipefail', '-c', source_script()], env=env, capture_output=True, text=True)
            output = (root / 'output').read_text() if (root / 'output').exists() else ''
            return result.returncode, output

    def test_current_verified_main(self):
        code, output = self.check_gate('workflow_run', LATEST)
        self.assertEqual(code, 0)
        self.assertIn('current=true', output)
        self.assertIn('sha=' + LATEST, output)

    def test_later_app_change_skips_old_validation(self):
        code, output = self.check_gate('workflow_run', OLDER, {'status': 'ahead', 'files': [{'filename': 'app/page.tsx'}]})
        self.assertEqual(code, 0)
        self.assertIn('current=false', output)

    def test_claim_cleanup_keeps_valid_app_build(self):
        code, output = self.check_gate('workflow_run', OLDER, {'status': 'ahead', 'files': [{'filename': 'collab/active/old/claim.md'}]})
        self.assertEqual(code, 0)
        self.assertIn('current=true', output)

    def test_diverged_history_is_not_accepted(self):
        code, output = self.check_gate('workflow_run', OLDER, {'status': 'diverged', 'files': [{'filename': 'collab/journal/a.md'}]})
        self.assertEqual(code, 0)
        self.assertIn('current=false', output)

    def test_truncated_compare_cannot_hide_app_changes(self):
        files = [{'filename': f'collab/{i}.md'} for i in range(300)]
        code, output = self.check_gate('workflow_run', OLDER, {'status': 'ahead', 'files': files})
        self.assertEqual(code, 0)
        self.assertIn('current=false', output)

    def test_manual_request_resolves_current_main(self):
        code, output = self.check_gate('workflow_dispatch', '')
        self.assertEqual(code, 0)
        self.assertIn('sha=' + LATEST, output)

    def test_invalid_sha_fails_closed(self):
        code, output = self.check_gate('workflow_dispatch', '', latest='invalid')
        self.assertNotEqual(code, 0)
        self.assertNotIn('current=true', output)



class DeploymentResultTests(unittest.TestCase):
    def run_result(self, conclusion):
        content = WORKFLOW.read_text().split('      - name: Pages 실행 및 실제 완료 확인', 1)[1]
        script = textwrap.dedent(content.split('run: |\n', 1)[1])
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            gh = root / 'gh'
            gh.write_text("""#!/bin/sh\ncase "$*" in\n  *"--method POST"*) echo '{"workflow_run_id":42}' ;;\n  *) printf '{"status":"completed","conclusion":"%s"}\\n' "$MOCK_RESULT" ;;\nesac\n""")
            gh.chmod(0o700)
            env = dict(os.environ, PATH=folder + os.pathsep + os.environ['PATH'],
                       SOURCE_SHA=LATEST, MOCK_RESULT=conclusion,
                       GITHUB_STEP_SUMMARY=str(root / 'summary'))
            result = subprocess.run(['bash', '-e', '-o', 'pipefail', '-c', script], env=env, capture_output=True, text=True)
            return result.returncode

    def test_only_completed_success_is_success(self):
        self.assertEqual(self.run_result('success'), 0)

    def test_failed_pages_propagates_failure(self):
        self.assertNotEqual(self.run_result('failure'), 0)

    def test_cancelled_pages_is_not_success(self):
        self.assertNotEqual(self.run_result('cancelled'), 0)


if __name__ == '__main__':
    unittest.main()
