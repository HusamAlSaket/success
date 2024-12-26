<?php

// app/Models/Package.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_name', 'content', 'price'
    ];

    public function codes()
    {
        return $this->hasMany(Code::class, 'package_id');
    }
}
