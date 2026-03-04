import re
from app.schemas import AnalyzeResponse

def analyze_static(code: str, language: str) -> AnalyzeResponse:
    lines = code.splitlines()
    warnings = []
    suggestions = []
    incomplete = []
    risks = []

    todos = sum(1 for l in lines if re.search(r"\bTODO\b", l, re.I))
    if todos:
        warnings.append(f"{todos} TODO items")
        suggestions.append("Resolve TODO items")
        incomplete.append("Pending TODOs")

    if re.search(r"\bpass\b", code):
        incomplete.append("Unimplemented paths")
        suggestions.append("Replace pass with logic")

    if re.search(r"\bdef\s+\w+\(.*\)\s*:\s*(?:#.*)?$", code, re.M):
        if not re.search(r"return\b", code):
            warnings.append("Missing return in function")
            suggestions.append("Add return statement")

    if "try:" in code and "except" not in code:
        warnings.append("Unhandled exceptions")
        suggestions.append("Add except blocks")

    if re.search(r"\beval\(", code) or re.search(r"\bexec\(", code):
        risks.append("Dynamic code execution")
        suggestions.append("Avoid eval/exec")

    if re.search(r"\bpickle\.loads\(", code) or re.search(r"\byaml\.load\(", code):
        risks.append("Unsafe deserialization")
        suggestions.append("Use safe loaders")

    if re.search(r"\bsubprocess\.", code) and "check=True" not in code:
        risks.append("Subprocess without checks")
        suggestions.append("Use safe subprocess patterns")

    if language in ["JavaScript", "TypeScript"]:
        if re.search(r"\bfunction\s+\w+\(.*\)\s*{\s*}$", code, re.M):
            incomplete.append("Empty function bodies")
            suggestions.append("Implement function logic")
        if "catch" not in code and re.search(r"\btry\s*{", code):
            warnings.append("Unhandled exceptions")
            suggestions.append("Add catch blocks")

    if language == "Java":
        if "public class" in code and "main" not in code:
            warnings.append("Missing entry point")
        if "try" in code and "catch" not in code:
            warnings.append("Unhandled exceptions")

    if language == "C++":
        if "#include" not in code:
            warnings.append("Missing includes")
        if re.search(r"\bint\s+main\s*\(", code) and "return" not in code:
            warnings.append("Missing return in main")

    if language == "Go":
        if "package main" in code and "func main" not in code:
            warnings.append("Missing main function")

    issue_count = len(warnings) + len(incomplete) + len(risks)
    confidence = max(0.3, 1.0 - min(1.0, issue_count * 0.08))

    return AnalyzeResponse(
        language=language,
        warnings=warnings,
        suggestions=list(dict.fromkeys(suggestions)),
        incomplete_blocks=incomplete,
        risk_flags=risks,
        confidence_score=round(confidence, 2),
    )
