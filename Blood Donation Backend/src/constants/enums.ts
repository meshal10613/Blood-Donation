export const RoleEnum = ["ADMIN", "USER"] as const;

export const BloodGroupEnum = [
    "A_POS",
    "A_NEG",
    "B_POS",
    "B_NEG",
    "O_POS",
    "O_NEG",
    "AB_POS",
    "AB_NEG",
] as const;

export const GenderEnum = ["MALE", "FEMALE"] as const;

export const DivisionEnum = [
    "Dhaka",
    "Chattagram",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
] as const;

export const DistrictEnum = {
    Dhaka: [
        "Dhaka",
        "Faridpur",
        "Gazipur",
        "Gopalganj",
        "Kishoreganj",
        "Madaripur",
        "Manikganj",
        "Munshiganj",
        "Narayanganj",
        "Narsingdi",
        "Tangail",
        "Shariatpur",
    ],

    Chattagram: [
        "Bandarban",
        "Brahmanbaria",
        "Chandpur",
        "Chattagram",
        "CoxsBazar",
        "Cumilla",
        "Khagrachhari",
        "Lakshmipur",
        "Noakhali",
        "Rangamati",
    ],

    Rajshahi: [
        "Bogura",
        "Chapainawabganj",
        "Joypurhat",
        "Naogaon",
        "Natore",
        "Pabna",
        "Rajshahi",
        "Sirajganj",
    ],

    Khulna: [
        "Bagerhat",
        "Chuadanga",
        "Jashore",
        "Jhenaidah",
        "Khulna",
        "Kushtia",
        "Magura",
        "Meherpur",
        "Narail",
        "Satkhira",
    ],

    Barishal: [
        "Barguna",
        "Barishal",
        "Bhola",
        "Jhalokathi",
        "Patuakhali",
        "Pirojpur",
    ],

    Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],

    Rangpur: [
        "Dinajpur",
        "Gaibandha",
        "Kurigram",
        "Lalmonirhat",
        "Nilphamari",
        "Panchagarh",
        "Rangpur",
        "Thakurgaon",
    ],

    Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
} as const;


export type Division = keyof typeof DistrictEnum;

// Type of all district values
export type District = typeof DistrictEnum[Division][number];

// export const allDistricts = Object.values(DistrictEnum).flat() as string[];
export const allDistricts = Object.values(DistrictEnum).flat() as [string, ...string[]];
