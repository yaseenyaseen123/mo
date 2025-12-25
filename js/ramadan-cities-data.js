// Ramadan 2026 - Complete Cities Database
// إمساكية رمضان 1447 هـ - 2026 م - قاعدة بيانات شاملة
// 
// المصدر الرئيسي: https://prayertimes.news/imsakia-ramadan.html
// جميع الأوقات مأخوذة من مصادر موثوقة رسمية
//
// =====================================================

const RAMADAN_COUNTRIES = {
    // 🇸🇦 السعودية
    sa: {
        name: 'السعودية',
        nameEn: 'Saudi Arabia',
        code: 'sa',
        flag: '🇸🇦',
        color: '#1e5a3e',
        cities: {
            mecca: { 
                name: 'مكة المكرمة',
                nameEn: 'Mecca',
                timezone: 'Asia/Riyadh',
                lat: 21.4225,
                lng: 39.8262,
                fajr: [4, 40], sunrise: [6, 5], dhuhr: [12, 26], asr: [15, 45], maghrib: [18, 45], isha: [20, 15]
            },
            medina: { 
                name: 'المدينة المنورة',
                nameEn: 'Medina',
                timezone: 'Asia/Riyadh',
                lat: 24.5247,
                lng: 39.5692,
                fajr: [4, 45], sunrise: [6, 10], dhuhr: [12, 30], asr: [15, 50], maghrib: [18, 48], isha: [20, 18]
            },
            riyadh: { 
                name: 'الرياض',
                nameEn: 'Riyadh',
                timezone: 'Asia/Riyadh',
                lat: 24.7136,
                lng: 46.6753,
                fajr: [4, 30], sunrise: [5, 55], dhuhr: [12, 15], asr: [15, 35], maghrib: [18, 35], isha: [20, 5]
            },
            jeddah: { 
                name: 'جدة',
                nameEn: 'Jeddah',
                timezone: 'Asia/Riyadh',
                lat: 21.5433,
                lng: 39.1728,
                fajr: [4, 45], sunrise: [6, 10], dhuhr: [12, 28], asr: [15, 47], maghrib: [18, 46], isha: [20, 16]
            },
            dammam: { 
                name: 'الدمام',
                nameEn: 'Dammam',
                timezone: 'Asia/Riyadh',
                lat: 26.4207,
                lng: 50.0888,
                fajr: [4, 25], sunrise: [5, 50], dhuhr: [12, 10], asr: [15, 30], maghrib: [18, 30], isha: [20, 0]
            },
            taif: { 
                name: 'الطائف',
                nameEn: 'Taif',
                timezone: 'Asia/Riyadh',
                lat: 21.2703,
                lng: 40.4158,
                fajr: [4, 42], sunrise: [6, 7], dhuhr: [12, 27], asr: [15, 46], maghrib: [18, 46], isha: [20, 16]
            }
        }
    },

    // 🇪🇬 مصر
    eg: {
        name: 'مصر',
        nameEn: 'Egypt',
        code: 'eg',
        flag: '🇪🇬',
        color: '#c9a961',
        cities: {
            cairo: { 
                name: 'القاهرة',
                nameEn: 'Cairo',
                timezone: 'Africa/Cairo',
                lat: 30.0444,
                lng: 31.2357,
                fajr: [4, 15], sunrise: [5, 40], dhuhr: [11, 57], asr: [15, 10], maghrib: [18, 13], isha: [19, 35]
            },
            alexandria: { 
                name: 'الإسكندرية',
                nameEn: 'Alexandria',
                timezone: 'Africa/Cairo',
                lat: 31.2001,
                lng: 29.9187,
                fajr: [4, 20], sunrise: [5, 45], dhuhr: [12, 0], asr: [15, 13], maghrib: [18, 16], isha: [19, 38]
            },
            giza: { 
                name: 'الجيزة',
                nameEn: 'Giza',
                timezone: 'Africa/Cairo',
                lat: 30.0131,
                lng: 31.2089,
                fajr: [4, 15], sunrise: [5, 40], dhuhr: [11, 57], asr: [15, 10], maghrib: [18, 13], isha: [19, 35]
            },
            aswan: { 
                name: 'أسوان',
                nameEn: 'Aswan',
                timezone: 'Africa/Cairo',
                lat: 24.0889,
                lng: 32.8998,
                fajr: [4, 5], sunrise: [5, 30], dhuhr: [11, 47], asr: [15, 0], maghrib: [18, 3], isha: [19, 25]
            }
        }
    },

    // 🇦🇪 الإمارات
    ae: {
        name: 'الإمارات',
        nameEn: 'UAE',
        code: 'ae',
        flag: '🇦🇪',
        color: '#00732f',
        cities: {
            dubai: { 
                name: 'دبي',
                nameEn: 'Dubai',
                timezone: 'Asia/Dubai',
                lat: 25.2048,
                lng: 55.2708,
                fajr: [4, 40], sunrise: [6, 5], dhuhr: [12, 25], asr: [15, 45], maghrib: [18, 43], isha: [20, 13]
            },
            abudhabi: { 
                name: 'أبوظبي',
                nameEn: 'Abu Dhabi',
                timezone: 'Asia/Dubai',
                lat: 24.4539,
                lng: 54.3773,
                fajr: [4, 42], sunrise: [6, 7], dhuhr: [12, 27], asr: [15, 47], maghrib: [18, 45], isha: [20, 15]
            },
            sharjah: { 
                name: 'الشارقة',
                nameEn: 'Sharjah',
                timezone: 'Asia/Dubai',
                lat: 25.3463,
                lng: 55.4209,
                fajr: [4, 40], sunrise: [6, 5], dhuhr: [12, 25], asr: [15, 45], maghrib: [18, 43], isha: [20, 13]
            },
            ajman: { 
                name: 'عجمان',
                nameEn: 'Ajman',
                timezone: 'Asia/Dubai',
                lat: 25.4052,
                lng: 55.5136,
                fajr: [4, 39], sunrise: [6, 4], dhuhr: [12, 24], asr: [15, 44], maghrib: [18, 42], isha: [20, 12]
            }
        }
    },

    // 🇯🇴 الأردن
    jo: {
        name: 'الأردن',
        nameEn: 'Jordan',
        code: 'jo',
        flag: '🇯🇴',
        color: '#007a3d',
        cities: {
            amman: { 
                name: 'عمّان',
                nameEn: 'Amman',
                timezone: 'Asia/Amman',
                lat: 31.9454,
                lng: 35.9284,
                // البيانات الصحيحة من https://jo.prayertimes.news/ramadan/amman_city.html
                // اليوم الأول: 18 فبراير 2026
                fajr: [5, 57], sunrise: [7, 24], dhuhr: [12, 58], asr: [16, 7], maghrib: [18, 32], isha: [20, 2]
            },
            irbid: { 
                name: 'إربد',
                nameEn: 'Irbid',
                timezone: 'Asia/Amman',
                lat: 32.5556,
                lng: 35.8500,
                fajr: [4, 56], sunrise: [6, 22], dhuhr: [12, 0], asr: [15, 12], maghrib: [17, 37], isha: [19, 2]
            },
            zarqa: { 
                name: 'الزرقاء',
                nameEn: 'Zarqa',
                timezone: 'Asia/Amman',
                lat: 32.0728,
                lng: 36.0880,
                fajr: [4, 54], sunrise: [6, 20], dhuhr: [11, 58], asr: [15, 10], maghrib: [17, 35], isha: [19, 0]
            },
            aqaba: { 
                name: 'العقبة',
                nameEn: 'Aqaba',
                timezone: 'Asia/Amman',
                lat: 29.5320,
                lng: 35.0063,
                fajr: [4, 48], sunrise: [6, 13], dhuhr: [11, 50], asr: [15, 2], maghrib: [17, 27], isha: [18, 52]
            }
        }
    },

    // 🇵🇸 فلسطين
    ps: {
        name: 'فلسطين',
        nameEn: 'Palestine',
        code: 'ps',
        flag: '🇵🇸',
        color: '#007a3d',
        cities: {
            jerusalem: { 
                name: 'القدس',
                nameEn: 'Jerusalem',
                timezone: 'Asia/Jerusalem',
                lat: 31.7683,
                lng: 35.2137,
                fajr: [4, 59], sunrise: [6, 25], dhuhr: [12, 1], asr: [15, 11], maghrib: [17, 36], isha: [19, 6]
            },
            gaza: { 
                name: 'غزة',
                nameEn: 'Gaza',
                timezone: 'Asia/Gaza',
                lat: 31.5, lng: 34.4667,
                fajr: [4, 57], sunrise: [6, 23], dhuhr: [11, 59], asr: [15, 9], maghrib: [17, 34], isha: [19, 4]
            },
            hebron: { 
                name: 'الخليل',
                nameEn: 'Hebron',
                timezone: 'Asia/Hebron',
                lat: 31.5326,
                lng: 35.0998,
                fajr: [4, 58], sunrise: [6, 24], dhuhr: [12, 0], asr: [15, 10], maghrib: [17, 35], isha: [19, 5]
            },
            nablus: { 
                name: 'نابلس',
                nameEn: 'Nablus',
                timezone: 'Asia/Hebron',
                lat: 32.2211,
                lng: 35.2544,
                fajr: [5, 0], sunrise: [6, 26], dhuhr: [12, 2], asr: [15, 12], maghrib: [17, 37], isha: [19, 7]
            }
        }
    },

    // 🇰🇼 الكويت
    kw: {
        name: 'الكويت',
        nameEn: 'Kuwait',
        code: 'kw',
        flag: '🇰🇼',
        color: '#007a3d',
        cities: {
            kuwait_city: { 
                name: 'مدينة الكويت',
                nameEn: 'Kuwait City',
                timezone: 'Asia/Kuwait',
                lat: 29.3759,
                lng: 47.9774,
                fajr: [4, 20], sunrise: [5, 45], dhuhr: [12, 5], asr: [15, 25], maghrib: [18, 25], isha: [19, 55]
            }
        }
    },

    // 🇶🇦 قطر
    qa: {
        name: 'قطر',
        nameEn: 'Qatar',
        code: 'qa',
        flag: '🇶🇦',
        color: '#8d1b3d',
        cities: {
            doha: { 
                name: 'الدوحة',
                nameEn: 'Doha',
                timezone: 'Asia/Qatar',
                lat: 25.2854,
                lng: 51.5310,
                fajr: [4, 30], sunrise: [5, 55], dhuhr: [12, 15], asr: [15, 35], maghrib: [18, 35], isha: [20, 5]
            }
        }
    },

    // 🇧🇭 البحرين
    bh: {
        name: 'البحرين',
        nameEn: 'Bahrain',
        code: 'bh',
        flag: '🇧🇭',
        color: '#ce1126',
        cities: {
            manama: { 
                name: 'المنامة',
                nameEn: 'Manama',
                timezone: 'Asia/Bahrain',
                lat: 26.2285,
                lng: 50.5860,
                fajr: [4, 28], sunrise: [5, 53], dhuhr: [12, 13], asr: [15, 33], maghrib: [18, 33], isha: [20, 3]
            }
        }
    },

    // 🇴🇲 عمان
    om: {
        name: 'عمان',
        nameEn: 'Oman',
        code: 'om',
        flag: '🇴🇲',
        color: '#d32011',
        cities: {
            muscat: { 
                name: 'مسقط',
                nameEn: 'Muscat',
                timezone: 'Asia/Muscat',
                lat: 23.6100,
                lng: 58.5300,
                fajr: [4, 35], sunrise: [6, 0], dhuhr: [12, 20], asr: [15, 40], maghrib: [18, 40], isha: [20, 10]
            },
            salalah: { 
                name: 'صلالة',
                nameEn: 'Salalah',
                timezone: 'Asia/Muscat',
                lat: 17.0151,
                lng: 54.0924,
                fajr: [4, 50], sunrise: [6, 10], dhuhr: [12, 25], asr: [15, 40], maghrib: [18, 40], isha: [20, 0]
            }
        }
    },

    // 🇮🇶 العراق
    iq: {
        name: 'العراق',
        nameEn: 'Iraq',
        code: 'iq',
        flag: '🇮🇶',
        color: '#ce1126',
        cities: {
            baghdad: { 
                name: 'بغداد',
                nameEn: 'Baghdad',
                timezone: 'Asia/Baghdad',
                lat: 33.3128,
                lng: 44.3615,
                fajr: [4, 50], sunrise: [6, 15], dhuhr: [11, 55], asr: [15, 10], maghrib: [17, 35], isha: [19, 0]
            },
            basra: { 
                name: 'البصرة',
                nameEn: 'Basra',
                timezone: 'Asia/Baghdad',
                lat: 30.5085,
                lng: 47.7835,
                fajr: [4, 35], sunrise: [6, 0], dhuhr: [11, 50], asr: [15, 5], maghrib: [17, 30], isha: [18, 55]
            },
            mosul: { 
                name: 'الموصل',
                nameEn: 'Mosul',
                timezone: 'Asia/Baghdad',
                lat: 36.3350,
                lng: 43.1189,
                fajr: [4, 58], sunrise: [6, 23], dhuhr: [12, 3], asr: [15, 18], maghrib: [17, 43], isha: [19, 8]
            }
        }
    },

    // 🇸🇾 سوريا
    sy: {
        name: 'سوريا',
        nameEn: 'Syria',
        code: 'sy',
        flag: '🇸🇾',
        color: '#ce1126',
        cities: {
            damascus: { 
                name: 'دمشق',
                nameEn: 'Damascus',
                timezone: 'Asia/Damascus',
                lat: 33.5138,
                lng: 36.2765,
                fajr: [4, 52], sunrise: [6, 18], dhuhr: [11, 58], asr: [15, 13], maghrib: [17, 38], isha: [19, 3]
            },
            aleppo: { 
                name: 'حلب',
                nameEn: 'Aleppo',
                timezone: 'Asia/Damascus',
                lat: 36.2012,
                lng: 37.1343,
                fajr: [4, 57], sunrise: [6, 23], dhuhr: [12, 3], asr: [15, 18], maghrib: [17, 43], isha: [19, 8]
            },
            homs: { 
                name: 'حمص',
                nameEn: 'Homs',
                timezone: 'Asia/Damascus',
                lat: 34.7333,
                lng: 36.7000,
                fajr: [4, 54], sunrise: [6, 20], dhuhr: [12, 0], asr: [15, 15], maghrib: [17, 40], isha: [19, 5]
            }
        }
    },

    // 🇱🇧 لبنان
    lb: {
        name: 'لبنان',
        nameEn: 'Lebanon',
        code: 'lb',
        flag: '🇱🇧',
        color: '#ed1c24',
        cities: {
            beirut: { 
                name: 'بيروت',
                nameEn: 'Beirut',
                timezone: 'Asia/Beirut',
                lat: 33.8886,
                lng: 35.4955,
                fajr: [4, 53], sunrise: [6, 19], dhuhr: [11, 59], asr: [15, 14], maghrib: [17, 39], isha: [19, 4]
            },
            tripoli: { 
                name: 'طرابلس',
                nameEn: 'Tripoli',
                timezone: 'Asia/Beirut',
                lat: 34.4333,
                lng: 35.8333,
                fajr: [4, 55], sunrise: [6, 21], dhuhr: [12, 1], asr: [15, 16], maghrib: [17, 41], isha: [19, 6]
            },
            sidon: { 
                name: 'صيدا',
                nameEn: 'Sidon',
                timezone: 'Asia/Beirut',
                lat: 33.5593,
                lng: 35.3750,
                fajr: [4, 52], sunrise: [6, 18], dhuhr: [11, 58], asr: [15, 13], maghrib: [17, 38], isha: [19, 3]
            }
        }
    },

    // 🇾🇪 اليمن
    ye: {
        name: 'اليمن',
        nameEn: 'Yemen',
        code: 'ye',
        flag: '🇾🇪',
        color: '#ce1126',
        cities: {
            sanaa: { 
                name: 'صنعاء',
                nameEn: 'Sanaa',
                timezone: 'Asia/Aden',
                lat: 15.3694,
                lng: 44.1910,
                fajr: [4, 55], sunrise: [6, 15], dhuhr: [12, 20], asr: [15, 35], maghrib: [18, 25], isha: [19, 45]
            },
            aden: { 
                name: 'عدن',
                nameEn: 'Aden',
                timezone: 'Asia/Aden',
                lat: 12.7855,
                lng: 45.0187,
                fajr: [4, 58], sunrise: [6, 15], dhuhr: [12, 20], asr: [15, 35], maghrib: [18, 25], isha: [19, 40]
            }
        }
    },

    // 🇩🇿 الجزائر
    dz: {
        name: 'الجزائر',
        nameEn: 'Algeria',
        code: 'dz',
        flag: '🇩🇿',
        color: '#007229',
        cities: {
            algiers: { 
                name: 'الجزائر',
                nameEn: 'Algiers',
                timezone: 'Africa/Algiers',
                lat: 36.7538,
                lng: 3.0588,
                fajr: [5, 5], sunrise: [6, 30], dhuhr: [12, 15], asr: [15, 30], maghrib: [18, 0], isha: [19, 25]
            },
            oran: { 
                name: 'وهران',
                nameEn: 'Oran',
                timezone: 'Africa/Algiers',
                lat: 35.6969,
                lng: -0.6331,
                fajr: [5, 7], sunrise: [6, 32], dhuhr: [12, 17], asr: [15, 32], maghrib: [18, 2], isha: [19, 27]
            }
        }
    },

    // 🇹🇳 تونس
    tn: {
        name: 'تونس',
        nameEn: 'Tunisia',
        code: 'tn',
        flag: '🇹🇳',
        color: '#e70013',
        cities: {
            tunis: { 
                name: 'تونس',
                nameEn: 'Tunis',
                timezone: 'Africa/Tunis',
                lat: 36.8065,
                lng: 10.1815,
                fajr: [5, 0], sunrise: [6, 25], dhuhr: [12, 10], asr: [15, 25], maghrib: [17, 55], isha: [19, 20]
            },
            sfax: { 
                name: 'صفاقس',
                nameEn: 'Sfax',
                timezone: 'Africa/Tunis',
                lat: 34.7406,
                lng: 10.7603,
                fajr: [4, 55], sunrise: [6, 20], dhuhr: [12, 5], asr: [15, 20], maghrib: [17, 50], isha: [19, 15]
            }
        }
    },

    // 🇲🇦 المغرب
    ma: {
        name: 'المغرب',
        nameEn: 'Morocco',
        code: 'ma',
        flag: '🇲🇦',
        color: '#c1272d',
        cities: {
            casablanca: { 
                name: 'الدار البيضاء',
                nameEn: 'Casablanca',
                timezone: 'Africa/Casablanca',
                lat: 33.5731,
                lng: -7.5898,
                fajr: [5, 15], sunrise: [6, 40], dhuhr: [12, 30], asr: [15, 45], maghrib: [18, 20], isha: [19, 45]
            },
            rabat: { 
                name: 'الرباط',
                nameEn: 'Rabat',
                timezone: 'Africa/Casablanca',
                lat: 34.0209,
                lng: -6.8416,
                fajr: [5, 16], sunrise: [6, 41], dhuhr: [12, 31], asr: [15, 46], maghrib: [18, 21], isha: [19, 46]
            },
            marrakech: { 
                name: 'مراكش',
                nameEn: 'Marrakech',
                timezone: 'Africa/Casablanca',
                lat: 31.6295,
                lng: -7.9811,
                fajr: [5, 10], sunrise: [6, 35], dhuhr: [12, 25], asr: [15, 40], maghrib: [18, 15], isha: [19, 40]
            }
        }
    },

    // 🇱🇾 ليبيا
    ly: {
        name: 'ليبيا',
        nameEn: 'Libya',
        code: 'ly',
        flag: '🇱🇾',
        color: '#239e46',
        cities: {
            tripoli: { 
                name: 'طرابلس',
                nameEn: 'Tripoli',
                timezone: 'Africa/Tripoli',
                lat: 32.8872,
                lng: 13.1913,
                fajr: [4, 50], sunrise: [6, 15], dhuhr: [12, 0], asr: [15, 15], maghrib: [17, 45], isha: [19, 10]
            },
            benghazi: { 
                name: 'بنغازي',
                nameEn: 'Benghazi',
                timezone: 'Africa/Tripoli',
                lat: 32.1191,
                lng: 20.0869,
                fajr: [4, 45], sunrise: [6, 10], dhuhr: [11, 55], asr: [15, 10], maghrib: [17, 40], isha: [19, 5]
            }
        }
    },

    // 🇸🇩 السودان
    sd: {
        name: 'السودان',
        nameEn: 'Sudan',
        code: 'sd',
        flag: '🇸🇩',
        color: '#007229',
        cities: {
            khartoum: { 
                name: 'الخرطوم',
                nameEn: 'Khartoum',
                timezone: 'Africa/Khartoum',
                lat: 15.5007,
                lng: 32.5599,
                fajr: [4, 30], sunrise: [5, 50], dhuhr: [11, 55], asr: [15, 10], maghrib: [18, 0], isha: [19, 20]
            }
        }
    },

    // 🇹🇷 تركيا
    tr: {
        name: 'تركيا',
        nameEn: 'Turkey',
        code: 'tr',
        flag: '🇹🇷',
        color: '#e30a17',
        cities: {
            istanbul: { 
                name: 'إسطنبول',
                nameEn: 'Istanbul',
                timezone: 'Europe/Istanbul',
                lat: 41.0082,
                lng: 28.9784,
                fajr: [5, 15], sunrise: [6, 45], dhuhr: [12, 20], asr: [15, 30], maghrib: [17, 55], isha: [19, 25]
            },
            ankara: { 
                name: 'أنقرة',
                nameEn: 'Ankara',
                timezone: 'Europe/Istanbul',
                lat: 39.9334,
                lng: 32.8597,
                fajr: [5, 10], sunrise: [6, 40], dhuhr: [12, 15], asr: [15, 25], maghrib: [17, 50], isha: [19, 20]
            }
        }
    },

    // 🇲🇾 ماليزيا
    my: {
        name: 'ماليزيا',
        nameEn: 'Malaysia',
        code: 'my',
        flag: '🇲🇾',
        color: '#010066',
        cities: {
            kuala_lumpur: { 
                name: 'كوالالمبور',
                nameEn: 'Kuala Lumpur',
                timezone: 'Asia/Kuala_Lumpur',
                lat: 3.1390,
                lng: 101.6869,
                fajr: [5, 45], sunrise: [7, 5], dhuhr: [13, 15], asr: [16, 35], maghrib: [19, 20], isha: [20, 35]
            }
        }
    },

    // 🇮🇳 الهند
    in: {
        name: 'الهند',
        nameEn: 'India',
        code: 'in',
        flag: '🇮🇳',
        color: '#ff9933',
        cities: {
            delhi: { 
                name: 'دلهي',
                nameEn: 'Delhi',
                timezone: 'Asia/Kolkata',
                lat: 28.7041,
                lng: 77.1025,
                fajr: [5, 0], sunrise: [6, 25], dhuhr: [12, 20], asr: [15, 40], maghrib: [18, 15], isha: [19, 40]
            },
            mumbai: { 
                name: 'مومباي',
                nameEn: 'Mumbai',
                timezone: 'Asia/Kolkata',
                lat: 19.0760,
                lng: 72.8777,
                fajr: [5, 10], sunrise: [6, 30], dhuhr: [12, 30], asr: [15, 50], maghrib: [18, 30], isha: [19, 50]
            }
        }
    }
};

// Helper function to get all cities
function getAllCities() {
    const allCities = {};
    for (const countryCode in RAMADAN_COUNTRIES) {
        const country = RAMADAN_COUNTRIES[countryCode];
        for (const cityCode in country.cities) {
            const city = country.cities[cityCode];
            allCities[`${countryCode}_${cityCode}`] = {
                ...city,
                country: country.name,
                countryEn: country.nameEn,
                countryCode: country.code,
                flag: country.flag,
                color: country.color
            };
        }
    }
    return allCities;
}

// Helper function to get cities by country
function getCitiesByCountry(countryCode) {
    return RAMADAN_COUNTRIES[countryCode]?.cities || {};
}
