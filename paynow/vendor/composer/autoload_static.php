<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2feda2da88fff6dcad32481ceaba8026
{
    public static $files = array (
        'b9fa40d76e3a17d43fa5f112ac14719d' => __DIR__ . '/..' . '/paynow/php-sdk/src/helper.php',
    );

    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'Paynow\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Paynow\\' => 
        array (
            0 => __DIR__ . '/..' . '/paynow/php-sdk/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2feda2da88fff6dcad32481ceaba8026::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2feda2da88fff6dcad32481ceaba8026::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit2feda2da88fff6dcad32481ceaba8026::$classMap;

        }, null, ClassLoader::class);
    }
}
