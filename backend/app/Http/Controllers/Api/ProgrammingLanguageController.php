<?php

namespace App\Http\Controllers\Api;

use App\Models\ProgrammingLanguage;  
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class ProgrammingLanguageController extends Controller
{
    public function index()
{
    $languages = ProgrammingLanguage::all();

    foreach ($languages as $language) {
        $language->image = asset('storage/' . $language->image);
    }

    return response()->json($languages);
}
}
