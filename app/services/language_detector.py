def detect_language(code: str) -> str:
    c = code.lower()
    if "import java" in c or "public class" in c or "System.out.println" in c:
        return "Java"
    if "#include" in code or "std::" in code or "using namespace" in code:
        return "C++"
    if "package main" in c or "func " in c or "fmt." in c:
        return "Go"
    if "def " in c or "import " in c or "try:" in c:
        return "Python"
    if "type " in c and "interface" in c:
        return "TypeScript"
    if "function " in c or "console.log" in c or "=> " in c:
        if "type " in c or "interface " in c or "as " in c:
            return "TypeScript"
        return "JavaScript"
    return "Unknown"
