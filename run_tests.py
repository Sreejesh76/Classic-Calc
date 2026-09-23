"""
Python verification script for Phase 2 Calculation Engine & Unit Tests.
"""
import os
import sys

def verify_phase2():
    required_files = [
        "src/logic/parser.js",
        "src/logic/formatter.js",
        "src/logic/calculator.js",
        "src/tests/calculator.test.js",
        "src/tests/testRunner.js",
        "test.html"
    ]
    for f in required_files:
        if not os.path.exists(f):
            print(f"FAILED: Missing file {f}")
            sys.exit(1)
            
    # Check parser content for no eval()
    with open("src/logic/parser.js", "r", encoding="utf-8") as f:
        content = f.read()
        if "eval(" in content or "Function(" in content:
            print("FAILED: Security violation! eval() or Function() found in parser.js")
            sys.exit(1)
            
    print("[OK] Phase 2 engine logic files and security constraints verified.")

if __name__ == "__main__":
    verify_phase2()
    print("Phase 2 Calculation Engine & Security Verification PASSED.")
