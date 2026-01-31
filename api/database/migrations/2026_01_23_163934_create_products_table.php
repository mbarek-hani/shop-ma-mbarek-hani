<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("products", function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->text("description");
            $table->string("image");
            $table->decimal("price", 8, 2);
            $table->decimal('rating_rate', 2, 1)->nullable()->after('description');
            $table->integer('rating_count')->default(0)->after('rating_rate');
            $table->foreignId('category_id')->constrained('categories')->onDelete('set null');
            $table->boolean("in_stock")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("products");
    }
};
