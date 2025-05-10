<?php

namespace App\Http\Controllers;

use App\Models\ProgrammingLanguage;  
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
