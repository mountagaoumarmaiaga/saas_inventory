<?php

namespace App\Helpers;

class NumberToWords
{
    private static $unites = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
    private static $dizaines = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'];

    public static function convert($number)
    {
        $number = (float)$number;
        if ($number == 0) return 'zéro';
        
        $entier = floor($number);
        $decimal = round(($number - $entier) * 100);
        
        $text = self::convertInt((int)$entier);
        
        if ($decimal > 0) {
            $text .= ' virgule ' . self::convertInt((int)$decimal);
        }
        
        return $text;
    }

    private static function convertInt($n)
    {
        if ($n < 20) {
            return self::$unites[$n];
        }
        if ($n < 100) {
            $d = (int)($n / 10);
            $u = $n % 10;
            if ($d == 7 || $d == 9) {
                $d--;
                $u += 10;
            }
            $result = self::$dizaines[$d];
            if ($d == 8 && $u == 0) {
                // quatre-vingts already has 's'
            } else {
                $result = str_replace('quatre-vingts', 'quatre-vingt', $result);
            }
            if ($u > 0) {
                if ($u == 1 || $u == 11) {
                    $result .= ($d == 8 ? '-un' : ' et ' . self::$unites[$u]);
                    if ($d == 7 && $u == 11) {
                         $result = 'soixante-onze';
                    }
                } else {
                    $result .= '-' . self::$unites[$u];
                }
            }
            return $result;
        }
        if ($n < 1000) {
            $c = (int)($n / 100);
            $r = $n % 100;
            $result = ($c == 1 ? 'cent' : self::$unites[$c] . ' cent' . ($r == 0 ? 's' : ''));
            if ($r > 0) {
                $result .= ' ' . self::convertInt($r);
            }
            return ltrim($result);
        }
        if ($n < 1000000) {
            $m = (int)($n / 1000);
            $r = $n % 1000;
            $result = ($m == 1 ? 'mille' : self::convertInt($m) . ' mille');
            if ($r > 0) {
                $result .= ' ' . self::convertInt($r);
            }
            return ltrim($result);
        }
        if ($n < 1000000000) {
            $m = (int)($n / 1000000);
            $r = $n % 1000000;
            $result = self::convertInt($m) . ' million' . ($m > 1 ? 's' : '');
            if ($r > 0) {
                $result .= ' ' . self::convertInt($r);
            }
            return ltrim($result);
        }
        return (string)$n;
    }
}
