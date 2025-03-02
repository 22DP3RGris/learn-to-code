<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RunCodeRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class CodeController extends Controller
{
    public function runCode(RunCodeRequest $request)
    {
        $language = $request->input('language');
    $code = $request->input('code');
    $outputFile = "output.txt";

    switch ($language) {
        case 'cpp':
            file_put_contents("code.cpp", $code);
            shell_exec("g++ code.cpp -o code && ./code > $outputFile 2>&1");
            break;
        case 'java':
            file_put_contents("Main.java", $code);
            shell_exec("javac Main.java && java Main > $outputFile 2>&1");
            break;
        case 'python':
            file_put_contents("script.py", $code);
            shell_exec("python script.py > $outputFile 2>&1");
            break;
        case 'javascript':
            file_put_contents("script.js", $code);
            shell_exec("node script.js > $outputFile 2>&1");
            break;
        default:
            return response()->json(['error' => 'Unsupported language'], 400);
    }

    $output = file_exists($outputFile) ? file_get_contents($outputFile) : "Execution error";

    return response()->json(['output' => $output]);
    }
}
