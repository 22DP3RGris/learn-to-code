<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('theory_change_requests', function (Blueprint $table) {
            $table->string('title')->nullable(); 
        });
    }

    public function down(): void
    {
        Schema::table('theory_change_requests', function (Blueprint $table) {
            $table->dropColumn('title'); 
        });
    }
};
