<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('programming_theory', function (Blueprint $table) {
            $table->dropUnique(['title']); 
        });
    }

    public function down(): void
    {
        Schema::table('programming_theory', function (Blueprint $table) {
            $table->dropUnique(['title']);
        });
    }
};
