<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RunCodeRequest;
use Illuminate\Support\Facades\File;

class CodeController extends Controller
{
    public function runCode(RunCodeRequest $request)
    {
        $language = $request->input('language');
        $code = $request->input('code');
        $outputFile = "output.txt";

        switch ($language) {
            case 'java':
                File::put("Main.java", $code);
                shell_exec("javac Main.java && java Main > $outputFile 2>&1");
                break;

            case 'python':
                File::put("script.py", $code);
                shell_exec("python script.py > $outputFile 2>&1");
                break;

            case 'javascript':
                File::put("script.js", $code);
                shell_exec("node script.js > $outputFile 2>&1");
                break;

            default:
                return response()->json(['error' => 'Unsupported language'], 400);
        }

        $output = File::exists($outputFile) ? File::get($outputFile) : "Execution error";

        return response()->json(['output' => $output]);
    }
}