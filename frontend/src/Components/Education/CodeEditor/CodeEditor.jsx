import { React, useState } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import './CodeEditor.css';
import Header from '../../Header/Header.jsx';
import SidePanel from "../../SidePanel/SidePanel.jsx";
import Editor from "@monaco-editor/react";
import axiosClient from "../../../axios-client.js";

function CodeEditor() {
    const { user, token } = useStateContext();
    const [code, setCode] = useState("print(\"Hello, world!\")");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("python");
    const [isRunning, setIsRunning] = useState(false);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const getDefaultCode = (lang) => {
        switch (lang) {
            case "java":
                return `public class Main {
    public static void main(String[] args) {
        // Code here
        System.out.println("Hello, world!");
    }
}`;
            case "python":
                return `print("Hello, world!")`;
            case "javascript":
                return `console.log("Hello, world!");`;
            default:
                return "";
        }
    };

    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        setLanguage(selectedLang);
        setCode(getDefaultCode(selectedLang));
    };

    const runCode = async () => {
        setIsRunning(true);
        setOutput("");
        try {
            const payload = { code, language };
            const { data } = await axiosClient.post("/run-code", payload);
            setOutput(data.output);
        } catch (error) {
            if (error.response?.data?.output) {
                setOutput(error.response.data.output);
            } else {
                setOutput("An error occurred while running the code.");
            }
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="code-editor">
            <Header page={"CODE EDITOR"} />
            <div className="content">
                <SidePanel />
                <div className="main-container">
                    <div className="container">
                        <Editor
                            className="editor"
                            height="65vh"
                            language={language}
                            theme="vs-dark"
                            value={code}
                            options={{
                                cursorStyle: "line",
                                cursorBlinking: "smooth",
                                minimap: { enabled: false },
                                lineNumbers: "on",
                                wordWrap: "on",
                                lineNumbersMinChars: 2,
                                wordWrapColumn: 200,
                                tabSize: 4,
                                cursorWidth: 5,
                                fontSize: 18,
                                autoClosingBrackets: "always",
                            }}
                            onChange={(newValue) => setCode(newValue)}
                        />
                        <div className="language-options">
                            <select className="language-select" value={language} onChange={handleLanguageChange}>
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                            </select>
                            <button className="clear btn" onClick={() => setCode("")}>CLEAR</button>
                            <button className="run btn" onClick={runCode} disabled={isRunning}>
                                {isRunning ? "Running..." : "RUN"}
                            </button>
                        </div>
                        <div className="output">
                            <h3>OUTPUT:</h3>
                            <pre>{output}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeEditor;