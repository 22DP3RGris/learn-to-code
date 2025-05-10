<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('programming_languages', 'image')) {
            Schema::table('programming_languages', function (Blueprint $table) {
                $table->string('image')->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('programming_languages', 'image')) {
            Schema::table('programming_languages', function (Blueprint $table) {
                $table->dropColumn('image');
            });
        }
    }
};

