import { React, useState} from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import './CodeEditor.css';
import Header from '../../Header/Header.jsx';
import SidePanel from "../../SidePanel/SidePanel.jsx";
import Editor from "@monaco-editor/react";

function CodeEditor() {
    const {user, token} = useStateContext();
    const [code, setCode] = useState();
    const [language, setLanguage] = useState('python');
    if (!token){
        return <Navigate to="/login"/>;
    }

    const handleLanguageChange = (event) => {
        console.log(event.target.value);
        setLanguage(event.target.value);
    };
    
    return (
        <div className="code-editor">
            <Header page={'CODE EDITOR'}/>
            <div className="content">
                <SidePanel/>
                <div className="main-container">
                    <div className="container">
                        <Editor
                            className="editor"
                            height="90%"
                            language={language}
                            theme="vs-dark"
                            value={code}
                            options={{
                                minimap: { enabled: false },  
                                lineNumbers: "on",             
                                wordWrap: "on",
                                lineNumbersMinChars: 2, 
                                wordWrapColumn: 200,            
                                tabSize: 8,                  
                                fontSize: 20,
                                scrollbar: {
                                    vertical: "auto",       
                                    horizontal: "auto",     
                                },
                                autoClosingBrackets: "always" 
                            }}
                            onChange={(newValue) => setCode(newValue)}
                        />
                        <div className="options">
                            <select className="language-select" value={language} onChange={handleLanguageChange}>
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                                <option value="cpp">C++</option>
                                <option value="java">Java</option>
                            </select>
                            <button className="clear btn">CLEAR</button>
                            <button className="run btn">RUN</button>
                            <button className="submit btn">SUBMIT</button> 
                        </div>        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeEditor;