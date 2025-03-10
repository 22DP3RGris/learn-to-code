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
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("python");

    if (!token) {
        return <Navigate to="/login" />;
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const runCode = async () => {
        const payload = { code, language };
        axiosClient.post("/run-code", payload)
            .then(({ data }) => {
                setOutput(data.output);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleEditorDidMount = (editor, monaco) => {
        monaco.languages.registerCompletionItemProvider("python", {
            provideCompletionItems: () => {
                const suggestions = [
                    {
                        label: "print",
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: "print()",
                        detail: "Izvada datus uz ekrāna"
                    },
                    {
                        label: "def",
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: "def function_name():\n    ",
                        detail: "Definē funkciju"
                    },
                    {
                        label: "for",
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: "for i in range(10):\n    ",
                        detail: "Cikls no 0 līdz 9"
                    },
                    {
                        label: "if",
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: "if condition:\n    ",
                        detail: "Nosacījuma pārbaude"
                    }
                ];
                return { suggestions };
            }
        });
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
                            onMount={handleEditorDidMount} 
                            onChange={(newValue) => setCode(newValue)}
                        />
                        <div className="language-options">
                            <select className="language-select" value={language} onChange={handleLanguageChange}>
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="cpp">C++</option>
                                <option value="java">Java</option>
                            </select>
                            <button className="clear btn" onClick={() => setCode("")}>CLEAR</button>
                            <button className="run btn" onClick={runCode}>RUN</button>
                            <button className="submit btn">SUBMIT</button>
                        </div>
                        <div className="output">
                            <h3>Rezultāts:</h3>
                            <pre>{output}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeEditor;