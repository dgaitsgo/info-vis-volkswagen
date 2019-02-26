const _ = require('lodash')
const fs = require('fs')
const axios = require('axios')

const uniqueModels = [{
	"id": "7471d364-bce8-5b23-95ab-92280a18554f",
	"name": "A1 Sportback"
}, {
	"id": "7628ffaa-5575-56e4-b9d0-c83539ab0f46",
	"name": "Q2"
}, {
	"id": "9201e12a-6ca8-584a-ae8c-586facabe8f0",
	"name": "SQ2"
}, {
	"id": "c74d9250-3915-5bc1-9330-c43e74e10101",
	"name": "TT Coupé"
}, {
	"id": "d1015e2a-eab2-567a-b5bf-ee4a262a2f5c",
	"name": "TT Roadster"
}, {
	"id": "938358f1-5ec9-5c98-885d-2b3923eda6f7",
	"name": "TTS"
}, {
	"id": "5139102e-96e0-5b69-95d9-e64899b4704e",
	"name": "A3 Sportback"
}, {
	"id": "2a301dbf-a8af-54c7-83a8-20246d7be856",
	"name": "A3 Limousine"
}, {
	"id": "cdfd121f-83e5-59fc-83ea-d031391d67cd",
	"name": "A3 Cabriolet"
}, {
	"id": "bf83faa3-31a4-593c-af66-c59fa4883964",
	"name": "S3"
}, {
	"id": "bb67368f-564e-5782-bf7f-da35ae552427",
	"name": "Q3"
}, {
	"id": "ddc1693c-bac6-56b7-86e6-dcc7d73ba3c9",
	"name": "A4"
}, {
	"id": "3e002e8a-86dc-58a0-9546-114d6cce70da",
	"name": "A4 Avant"
}, {
	"id": "ed25d46f-f83d-513d-8b79-7730e81ea2b3",
	"name": "A4 allroad quattro"
}, {
	"id": "ec791a17-ad35-5a9a-8104-af8fdc36b9ee",
	"name": "A5 Coupé"
}, {
	"id": "2160eeaa-939f-56dc-8d98-6f8f34406d74",
	"name": "A5 Sportback"
}, {
	"id": "5c0daa8f-8fda-55f6-b7e0-bf9cd347490d",
	"name": "A5 Cabriolet"
}, {
	"id": "eebdc5fc-34d0-5aa8-a8c6-cb77c9e77b8d",
	"name": "Q5"
}, {
	"id": "9fc6a2d0-09f3-5c59-a28c-62d55a8d0461",
	"name": "A6"
}, {
	"id": "5f365886-7299-5a76-955a-959664cabb6e",
	"name": "A6 Avant"
}, {
	"id": "2daca6bb-32f9-58a1-98e9-5b3d097df63b",
	"name": "A7 Sportback"
}, {
	"id": "26171a0c-9d23-54d3-8ce7-ec7191d76afb",
	"name": "Q7"
}, {
	"id": "1e9a1d73-ded2-56b2-b778-428f005dd03d",
	"name": "Q8"
}, {
	"id": "4f97316b-37d7-5cbf-86c9-19b7070f5922",
	"name": "A8"
}, {
	"id": "c96500e2-4f0c-5930-8826-47ba4167091a",
	"name": "e-tron"
}, {
	"id": "4e5d68b6-f8a5-5c69-9029-ba4617d1f7c9",
	"name": "A3 Sedã"
}, {
	"id": "523212b2-0512-56b0-9e13-42c06bd8ed7a",
	"name": "A5 Conversível"
}, {
	"id": "ea809f13-b1b5-589a-8126-6f083e92e8fb",
	"name": "SQ5"
}, {
	"id": "4d935137-86ef-5ef5-a09f-f4710231f60e",
	"name": "up!"
}, {
	"id": "40964b55-b0ef-581b-a1b4-5f343ce1e9ed",
	"name": "up! GTI"
}, {
	"id": "f01d11e1-def8-563e-8f48-8cc0f9dfd24b",
	"name": "Nuova Polo"
}, {
	"id": "aae094c7-ffe3-5a36-ab75-1ab959add64b",
	"name": "Nuova Polo GTI"
}, {
	"id": "8408f6d9-7829-5508-b710-b0388a8fe344",
	"name": "Golf"
}, {
	"id": "66586071-580a-5396-8c82-b7f6be3d4f21",
	"name": "Golf - Allestimenti Sportivi"
}, {
	"id": "f659303e-b42e-5134-8518-b912ad350b13",
	"name": "e-Golf"
}, {
	"id": "6f4829cc-46bd-54db-8ede-7d10b3ed8421",
	"name": "T-Roc"
}, {
	"id": "58bb15fe-19e4-5f78-86a7-0ad0b18ab387",
	"name": "Golf Variant"
}, {
	"id": "b32b7256-bef7-50ee-a9ad-7e403e23b76a",
	"name": "Touran"
}, {
	"id": "9396f39f-918e-5e1b-b76e-4f7d8a7de022",
	"name": "Nuova Tiguan"
}, {
	"id": "0bb14d0e-e05f-520e-b9e5-1ddf8825f42f",
	"name": "Nuova Tiguan Allspace"
}, {
	"id": "38dc315f-346d-5647-9820-a7cbd1f65e72",
	"name": "Passat"
}, {
	"id": "b99a1775-2660-585d-9e6b-6b0d6bf1b85b",
	"name": "Passat Variant"
}, {
	"id": "8efbbae6-974a-59f1-b327-323f52b72096",
	"name": "Arteon"
}, {
	"id": "831efad1-3add-562a-a28f-4fe34793f021",
	"name": "Sharan"
}, {
	"id": "10c583d7-d5a5-5a79-b212-aafbe09080c7",
	"name": "Nuova Touareg"
}, {
	"id": "125202ec-dc83-5660-a8ea-d329e225f873",
	"name": "A3 Berlina"
}, {
	"id": "e5565f9c-e850-5c5e-ba66-6efb85098795",
	"name": "RS 3"
}, {
	"id": "23eea9d4-9d8d-5211-99b6-97bc58e63e8f",
	"name": "S4/S4 Avant"
}, {
	"id": "a2dcf2a7-d37b-56cf-a8d2-6e35609f885d",
	"name": "RS 4 Avant"
}, {
	"id": "caae504c-14e2-5d81-8516-f6871168e261",
	"name": "S5"
}, {
	"id": "46ca856b-668b-5999-82e3-0d8b85d92fee",
	"name": "RS 5"
}, {
	"id": "dc0fdbca-3253-5131-b180-d06703d6829a",
	"name": "A6 allroad quattro (C7)"
}, {
	"id": "0e898978-9142-5386-8039-d5eca579f04c",
	"name": "R8 Coupé"
}, {
	"id": "5c953895-eeaa-58fd-9632-e3a3329dea07",
	"name": "R8 Spyder"
}, {
	"id": "30004eb3-442e-5129-bd26-8023c580743a",
	"name": "Citigo"
}, {
	"id": "cd204992-255c-5553-b184-60f1b8fe4c9a",
	"name": "Fabia"
}, {
	"id": "e27390fd-e2a2-57d5-ad4f-a2d63371c851",
	"name": "Fabia Wagon"
}, {
	"id": "e6b5af0b-2070-50f7-be07-79348b25ee3e",
	"name": "Scala"
}, {
	"id": "73ccded6-281f-534b-a8a8-85bceaf564d8",
	"name": "Rapid Spaceback"
}, {
	"id": "01f420e5-0db7-5d3d-a97f-15ca9a2ac824",
	"name": "Karoq"
}, {
	"id": "47b9923e-b75b-5c6f-ba0c-a404335b8e58",
	"name": "Kodiaq"
}, {
	"id": "7f317da5-deb5-5ff6-a449-6c9b95e6669e",
	"name": "Octavia"
}, {
	"id": "722f536e-7fe8-519b-be42-32c0a0131eeb",
	"name": "Octavia Wagon"
}, {
	"id": "e908b5a8-9570-547a-8144-788c72c2cdf9",
	"name": "Superb"
}, {
	"id": "fb79636a-bd63-5559-a829-aaa1e7fb482c",
	"name": "Superb Wagon"
}, {
	"id": "0ff35b5b-c6d8-5964-be38-dc8d301977fa",
	"name": "Caddy Furgone"
}, {
	"id": "32d30daa-28c0-5eb4-9a31-b1bfa730976b",
	"name": "Caddy Kombi"
}, {
	"id": "dd328d79-634e-5f69-8c7e-aeb7c73676d0",
	"name": "Caddy"
}, {
	"id": "f2cd5775-6aef-51aa-88b2-d00a584cd876",
	"name": "Caddy Beach"
}, {
	"id": "078659ae-4b39-5510-89d8-794262ff90e1",
	"name": "Allestimenti Focaccia"
}, {
	"id": "b1991ff3-3a3d-5541-8ee5-f62578527667",
	"name": "Transporter Telaio"
}, {
	"id": "64b7136d-7ca8-5447-bcb7-c0480209c92a",
	"name": "Transporter Furgone"
}, {
	"id": "735fe577-9431-5a85-9760-61b3f66240d0",
	"name": "Transporter Kombi"
}, {
	"id": "33ff731c-1f21-5a1a-a929-95d55803e35a",
	"name": "Allestimenti Onnicar, Lauri e Lamberet"
}, {
	"id": "9ef41afb-1ebb-537b-b71a-7441cd669ce1",
	"name": "Crafter Camioncino"
}, {
	"id": "63ea3f24-2b74-5e6a-a382-3344d53d845d",
	"name": "Crafter Autotelaio"
}, {
	"id": "cd16c669-c811-58f2-be1d-742190f64e54",
	"name": "Crafter Furgone"
}, {
	"id": "1f33e4c9-23ff-56cc-91be-e78ba3cf67b8",
	"name": "Crafter Ribaltabile Trilaterale"
}, {
	"id": "3e0c0760-2d06-516c-b26d-ae37ddbe6c10",
	"name": "Crafter con Furgonatura"
}, {
	"id": "674a3193-b8d1-5d4b-a52c-7c6c263b41bb",
	"name": "Crafter Pianalato"
}, {
	"id": "c37e8316-26d6-515a-99a0-7b8c582f0b65",
	"name": "Crafter Telaio Cabinato senza paratia"
}, {
	"id": "2f112c8b-64ac-5077-ae70-2e43c9ae5248",
	"name": "Amarok"
}, {
	"id": "aebcfb75-4885-5a81-a769-6f0bc13dd45f",
	"name": "Caravelle"
}, {
	"id": "85df1c52-97bf-5ff7-b56c-e1994506101d",
	"name": "Multivan"
}, {
	"id": "237e4e05-b982-5460-987e-b1d8ab7ea923",
	"name": "California"
}, {
	"id": "0f26d10a-b098-5518-84ca-b2417c49f1e0",
	"name": "Mii"
}, {
	"id": "ae27bf9f-196b-532f-9988-f97d9fac1829",
	"name": "Ibiza"
}, {
	"id": "edb1b910-0e28-510a-8083-53eec93302db",
	"name": "Leon"
}, {
	"id": "8f31ef77-e497-5f6e-8e8c-0855176bb5f3",
	"name": "Arona"
}, {
	"id": "cb887960-ca8b-599d-83df-8ef2d72f376e",
	"name": "Ateca"
}, {
	"id": "f191813e-d126-5f1f-b412-b8e42d01231a",
	"name": "Alhambra"
}, {
	"id": "2a817c21-af10-557a-99de-31a586be105c",
	"name": "Tarraco"
}, {
	"id": "09c72417-a6bd-55a7-b365-cc6d432106ad",
	"name": "Caddy Użytkowe"
}, {
	"id": "8ab3c86b-2ba1-55bf-88c0-4a918f01b642",
	"name": "Caddy Osobowe"
}, {
	"id": "24874160-dd50-572a-b91f-3117616a5fa1",
	"name": "T6 Transporter Podwozie"
}, {
	"id": "9e3e7fb9-e603-5c3f-b465-391578bba581",
	"name": "T6 Transporter Skrzyniowy"
}, {
	"id": "cc483158-c997-5d67-812a-6f10c7dc088f",
	"name": "T6 Transporter Furgon"
}, {
	"id": "566e594b-7c85-5d0a-a18c-ad71036bcb26",
	"name": "T6 Transporter Kombi"
}, {
	"id": "a4a54a64-fccf-589e-8622-1542f824561d",
	"name": "T6 Caravelle"
}, {
	"id": "f0966d28-5a08-58e5-bd6f-12567292c30f",
	"name": "T6 California"
}, {
	"id": "d3124d73-194f-5896-8b88-eb190dbdbf27",
	"name": "T6 Multivan"
}, {
	"id": "5614af66-bea5-544f-aef3-294cbf5e8f6e",
	"name": "Nowy Crafter Podwozie"
}, {
	"id": "2bb77284-4cef-5484-a296-e629c4dab06c",
	"name": "Nowy Crafter Skrzyniowy"
}, {
	"id": "c68f1cfc-5275-5dd3-abc6-517525161914",
	"name": "Nowy Crafter Furgon"
}, {
	"id": "bce523c2-96fe-5b9e-bbd2-b178890ef97b",
	"name": "Nowa Ibiza"
}, {
	"id": "36f75dc7-72e0-5156-bfcb-fd14f0aeadc9",
	"name": "Toledo"
}, {
	"id": "8b52d9b9-4c35-550e-8377-8d7cab8cabb8",
	"name": "CUPRA"
}, {
	"id": "30d3fdc6-ae46-59ef-8828-6803c15d35fc",
	"name": "e-up!"
}, {
	"id": "ffba50aa-221e-5b02-b474-534f267da9a6",
	"name": "Polo"
}, {
	"id": "c4da9fd2-f1fa-51c1-82d3-6f53713369ec",
	"name": "Der neue T-Cross"
}, {
	"id": "f0ca812d-d9f3-54e6-bb37-55b98dbe9fbc",
	"name": "Neuer T-Roc"
}, {
	"id": "ef81bd36-be5b-5551-a3a8-4189e87bc4de",
	"name": "Neuer Golf Sportsvan"
}, {
	"id": "15039b88-fdac-53d6-b2e0-48713c9872fd",
	"name": "Tiguan"
}, {
	"id": "024bd3fd-e6da-578c-8500-d6591e273f88",
	"name": "Neuer Tiguan Allspace"
}, {
	"id": "966522df-d844-5141-8e6d-5ecd12f344b3",
	"name": "Neuer Passat"
}, {
	"id": "d15475ba-1836-5c48-bd7d-fbd39e9455e4",
	"name": "Neuer Passat Variant"
}, {
	"id": "dcbd5157-c6c9-5743-97aa-35871ec4c9f3",
	"name": "Neuer Touareg"
}, {
	"id": "2aa4b907-aeca-5fe0-8a12-44ec88f69ede",
	"name": "Fabia Combi"
}, {
	"id": "63ffe326-b63a-56aa-b71d-3848083c5309",
	"name": "Octavia Combi"
}, {
	"id": "dbb6cdac-2139-5002-8eb1-85aacd13f97f",
	"name": "Superb Combi"
}, {
	"id": "09c1612b-b3bc-5e36-bf94-f46e721b40c0",
	"name": "New T-Roc"
}, {
	"id": "e2817b7c-d8dd-5195-a017-a35cd762398f",
	"name": "New Touareg"
}, {
	"id": "9c783abd-9ac8-541f-b187-fc94ea5d1219",
	"name": "The up!"
}, {
	"id": "9d44d010-a00b-5226-a6ea-9de2400d10e4",
	"name": "The Polo"
}, {
	"id": "1fa872e5-8287-5312-839e-d1f1a7ec5726",
	"name": "The Golf"
}, {
	"id": "2577a61d-1e00-5fa1-91fd-b6766ca1fb91",
	"name": "The e-Golf"
}, {
	"id": "01db5a44-bc68-5a28-93bd-37c5f4a91989",
	"name": "The T-Roc"
}, {
	"id": "daf4a298-6d1f-5b87-918e-19cd2b591dbb",
	"name": "The Touran"
}, {
	"id": "5fcf74c2-a933-5182-8c4d-cd258d354a7e",
	"name": "The Tiguan"
}, {
	"id": "ad23d17e-e0e2-54a6-98fc-a96614c8b9aa",
	"name": "The Tiguan Allspace"
}, {
	"id": "d73b4c60-c09d-5abb-a0fd-8bf03eaf6022",
	"name": "The Passat Saloon"
}, {
	"id": "2b03c455-13d7-521c-bb76-c715dbf5d5e4",
	"name": "The Passat Estate"
}, {
	"id": "fef77daa-d7a1-5b2c-8dd0-8f8ddda70434",
	"name": "The Arteon"
}, {
	"id": "896ecaeb-c756-5429-bcbc-da5a0b3d293f",
	"name": "The Sharan"
}, {
	"id": "868f49b2-6600-5822-a36d-c38cf24d90be",
	"name": "The new Touareg"
}, {
	"id": "fca51934-2cce-501f-927e-5abec80de67f",
	"name": "MII"
}, {
	"id": "8946ecd9-ddca-57e4-8b29-7b49de28a694",
	"name": "IBIZA"
}, {
	"id": "70a55e4d-db84-548c-ae92-97786c48c462",
	"name": "LEON"
}, {
	"id": "8b18d4f4-cc9d-5c48-8c1d-b6e3cfb0b521",
	"name": "ARONA"
}, {
	"id": "e7242e83-06f3-5879-834f-df04130fd0af",
	"name": "ATECA"
}, {
	"id": "546ec518-cb10-5a92-864b-2f2398cb7693",
	"name": "Golf SV"
}, {
	"id": "5a0b8a73-4ec8-5d1b-9e2c-d1708ca80f2d",
	"name": "Golf Estate"
}, {
	"id": "8fa838a1-70a1-5a3e-b326-a3025b18a6cb",
	"name": "Tiguan Allspace"
}, {
	"id": "8a21294b-36a8-50cf-9c5a-6c03bd784d5f",
	"name": "Passat Saloon"
}, {
	"id": "70f99a00-4d43-51e5-972b-b6c98938728e",
	"name": "Passat Estate"
}, {
	"id": "f46f7145-780d-5a84-96f2-b4b50a662e84",
	"name": "TT RS"
}, {
	"id": "c1af316f-3385-5382-9f61-2e010458b046",
	"name": "A3 Saloon"
}, {
	"id": "9b483896-1e37-5795-941f-0f928adf82f3",
	"name": "RS3"
}, {
	"id": "6b2f0e0e-7fcb-5eaf-9928-cef94b05b339",
	"name": "S6 / S6 Avant"
}, {
	"id": "6f5c93dd-d52c-5588-bb68-db23b5de588d",
	"name": "S7 Sportback"
}, {
	"id": "0ac28136-111f-5b23-b802-72089b42abb0",
	"name": "Citigo 3-Door"
}, {
	"id": "122b73cd-4d05-5a5c-ab6f-ea36edf44605",
	"name": "Citigo 5-Door"
}, {
	"id": "9313aab0-4e31-5599-9a22-8e26022d11d6",
	"name": "Fabia Hatch"
}, {
	"id": "54bd9b12-1460-557a-b0d3-bb3b5e574a49",
	"name": "Fabia Estate"
}, {
	"id": "615cdda5-d02f-5f8e-b154-37f9212be989",
	"name": "Octavia Hatch"
}, {
	"id": "802fba1a-f8e3-55b5-b20b-66ff51508a6d",
	"name": "Octavia Estate"
}, {
	"id": "40801d52-fde7-524b-a86a-b892235e1217",
	"name": "Superb Hatch"
}, {
	"id": "31aee406-231e-50f4-8e63-0e180d6cb7cc",
	"name": "Superb Estate"
}, {
	"id": "6024aa91-50a0-5e0c-9df7-e57b40b8497b",
	"name": "Crafter Tipper"
}, {
	"id": "4e28aa3b-d532-5e57-a0f0-8d775ce0cda0",
	"name": "Crafter Dropside"
}, {
	"id": "7c5df219-1025-5648-8186-34fe1fcf4b0d",
	"name": "Caddy Panel van"
}, {
	"id": "c5e75d98-6a21-586a-96dd-fceb92940abc",
	"name": "Caddy Life"
}, {
	"id": "c5bb3574-a11d-598d-9517-6c407e18e0c9",
	"name": "Transporter Single Cab"
}, {
	"id": "24b6b814-28b5-5ab3-aff0-39435c01093a",
	"name": "Transporter Double Cab"
}, {
	"id": "c134e5e5-15c3-5d6d-8adb-ee668828b416",
	"name": "Transporter Zugkopf"
}, {
	"id": "fe30e757-8b1a-554a-9273-2953bb917dc5",
	"name": "Transporter Panel van"
}, {
	"id": "4d6ccd1b-ce67-57f7-9112-739747123c98",
	"name": "Transporter Window van"
}, {
	"id": "94a5d663-52ef-5391-988d-40fa338fdc47",
	"name": "Transporter Shuttle"
}, {
	"id": "a568a429-8e7d-5a8a-aea7-8ead0702c905",
	"name": "Crafter Luton Van"
}, {
	"id": "d6760d1b-2a01-5691-a6ec-b774edbdb644",
	"name": "Crafter Single Cab"
}, {
	"id": "7214da7d-6f62-5048-b645-9fcbe1fa21df",
	"name": "Crafter Double Cab"
}, {
	"id": "4753f1bc-1d8a-5e7b-9a42-4c0ab1a5b02f",
	"name": "Crafter Panel van"
}, {
	"id": "0c952c96-52b4-5262-a8b8-0d37a63cb9b3",
	"name": "Mii MY19"
}, {
	"id": "cf623e3b-265b-51b3-bd9a-c6bda06a3bc0",
	"name": "IBIZA MY19"
}, {
	"id": "5db241ec-5fcc-5df5-a0a0-5fb6231e92ff",
	"name": "LEON MY19"
}, {
	"id": "9fc72abc-7c63-5ebe-9590-1df0efbf4796",
	"name": "ARONA MY19"
}, {
	"id": "c8539e4e-e650-51da-9d62-c84a25a4ce75",
	"name": "ATECA MY19"
}, {
	"id": "a0ea05ec-18ac-5a31-a2e8-0ba74912cd66",
	"name": "ALHAMBRA MY19"
}, {
	"id": "d2ec5c14-d784-53f2-9aea-1ed0c85c033e",
	"name": "TARRACO"
}, {
	"id": "0036a298-08e2-57bd-8899-63b8ca03ab5c",
	"name": "Golf Sportsvan"
}, {
	"id": "269f3c16-fcb5-5682-911b-24e6079bf8d0",
	"name": "Golf SW"
}, {
	"id": "bbab34f4-3c4e-5430-aa1b-ada21b1f0e36",
	"name": "Passat SW"
}, {
	"id": "a53dce04-47b4-5674-aa57-a400254bddef",
	"name": "Passat Alltrack"
}, {
	"id": "73d84e86-e8f8-5f48-bd8d-2606af976b63",
	"name": "Nouveau Touareg"
}, {
	"id": "fedd2f91-5311-5cd2-be6b-862a037d30bc",
	"name": "Caddy Van"
}, {
	"id": "98c91b04-fb82-5af6-8cfd-1d7b59fb0d7e",
	"name": "Transporter"
}, {
	"id": "83bff632-f138-5568-99b1-6db204d2255b",
	"name": "Crafter"
}, {
	"id": "42285371-128a-515f-a987-82271452805a",
	"name": "Nuevo T-Cross"
}, {
	"id": "649ad025-90b8-598f-8d12-5ee4f64bcc09",
	"name": "Nuevo T-Roc"
}, {
	"id": "e8b3dee8-d160-5cd0-b8c1-b95969744755",
	"name": "Nuevo Touareg"
}, {
	"id": "1cf3f736-dc4f-5e2a-95bb-ee737c8e7b35",
	"name": "A3 berlina"
}, {
	"id": "c88f9d91-6667-537a-a062-27d52c527dfa",
	"name": "A3 Cabrio"
}, {
	"id": "47de1617-ea6b-5949-9b6c-5afad23c6784",
	"name": "A5 Cabrio"
}, {
	"id": "c795b1e7-dcf7-504f-9be0-5746c0e06cf7",
	"name": "Caddy Profesional"
}, {
	"id": "79b10177-58a6-5cdd-a1c5-51821a51c259",
	"name": "Transporter chasis"
}, {
	"id": "47b19620-c260-5b12-9167-107d01d90a88",
	"name": "El nuevo e-Crafter"
}, {
	"id": "fa979df1-d4e0-5207-b3c0-98ef6d4ec9d7",
	"name": "Crafter Chasis"
}, {
	"id": "d90a45b0-b250-53e1-9196-6f7d5b467d6c",
	"name": "Crafter Box"
}, {
	"id": "79992575-5551-5af4-8b85-a7831172cd87",
	"name": "Crafter Fresh"
}, {
	"id": "6ef39d26-8104-5791-b80d-df6cb0193e6f",
	"name": "T-Cross"
}, {
	"id": "7a8b3043-2680-53ec-a9da-469fc496efda",
	"name": "Touareg"
}, {
	"id": "b04b066e-4aef-5950-8415-654d113053b8",
	"name": "Rapid"
}, {
	"id": "e35736b6-298c-5003-9808-4d40f506b102",
	"name": "Den nye Crafter"
}, {
	"id": "ef7f7c23-2537-5067-9c0b-25f77433a1de",
	"name": "Der up!"
}, {
	"id": "8cd99132-b085-5188-88fb-b7e3a86a336f",
	"name": "Der Polo"
}, {
	"id": "54ae5960-4c6e-5a50-9f36-c88ab444db21",
	"name": "Der Golf"
}, {
	"id": "753de43a-4cb2-5bf4-b90c-c152bec3d1fb",
	"name": "Der T-Roc"
}, {
	"id": "2b12048f-4865-5e71-8f63-acb8c2c94233",
	"name": "Der Golf Sportsvan"
}, {
	"id": "84f59e2a-71e8-561a-911a-0134267586c1",
	"name": "Der Golf Variant"
}, {
	"id": "16ceb037-1966-57fc-9aea-257f6016b79d",
	"name": "Der Touran"
}, {
	"id": "c53988e7-24ea-5e3a-86ec-9bf34b63f979",
	"name": "Der Tiguan"
}, {
	"id": "62968338-4878-533f-ae35-14b9561a7ca7",
	"name": "Der neue Tiguan Allspace"
}, {
	"id": "a23c876e-a9c5-54fe-9b6b-7fd9ebb6fc50",
	"name": "Der Passat"
}, {
	"id": "6a2a128a-2a1f-56d6-962b-c0837105bf16",
	"name": "Der Passat Variant"
}, {
	"id": "2e883f7b-1139-56c9-a5fb-fd811ff7bead",
	"name": "Der Arteon"
}, {
	"id": "32fd525f-39df-5aa0-9507-3a93d0dab73b",
	"name": "Der Sharan"
}, {
	"id": "c0eb1c5f-ab3d-5627-ade5-ce5638a4b350",
	"name": "Der neue Touareg"
}, {
	"id": "eea4772a-8579-56a0-bcae-3e630cc2fe9c",
	"name": "A3 Sedan"
}, {
	"id": "2baf3cb6-50e0-582c-a240-f85f11378604",
	"name": "Der Crafter Kipper"
}, {
	"id": "15f83139-1fad-516c-b501-c6124e14609b",
	"name": "Der Caddy Kastenwagen"
}, {
	"id": "e240330c-ecb5-5c1c-a922-170f52ea3472",
	"name": "Der Caddy Kombi"
}, {
	"id": "81f5dd90-2e9e-51d0-b126-fea97d354db5",
	"name": "Der Caddy"
}, {
	"id": "52bedb09-1774-5628-a016-9836990e252b",
	"name": "Der Caddy Beach"
}, {
	"id": "127b6237-08ca-54d4-895f-0d23e654257b",
	"name": "Der Amarok"
}, {
	"id": "ea5d9ee6-669d-57d8-b56b-03b38f54abcc",
	"name": "Das Transporter Fahrgestell"
}, {
	"id": "3e05c41c-0498-5262-8252-e669a083b4d0",
	"name": "Der Transporter Pritschenwagen"
}, {
	"id": "0920d483-e607-571c-a820-eb55114b4e6b",
	"name": "Der Transporter Kastenwagen"
}, {
	"id": "ee045645-7aea-5cc5-b610-7041daab1b24",
	"name": "Der Transporter Kombi"
}, {
	"id": "e1cb7100-5579-52fd-9331-e2e23b4deda9",
	"name": "Der Caravelle"
}, {
	"id": "1e6c6757-4a15-5e01-98ad-ab5c001103b4",
	"name": "Der California"
}, {
	"id": "d4d6f4a4-de21-528a-b302-e1b7893a80ee",
	"name": "Der Multivan"
}, {
	"id": "a03167c5-23fa-5926-a4e6-5bc9ae020482",
	"name": "Das Crafter Fahrgestell"
}, {
	"id": "65dfdb62-2816-5191-bdc9-dbda3fab6147",
	"name": "Der Crafter Pritschenwagen"
}, {
	"id": "a24dbb91-ce09-5450-9372-57ef69d67719",
	"name": "Der Crafter Kastenwagen"
}, {
	"id": "e0778c2c-0533-5112-af99-9c3246fe871e",
	"name": "Grand California"
}, {
	"id": "2ab9e050-eb1c-5ee4-ab34-e044a5c8a586",
	"name": "New T-Cross"
}, {
	"id": "7c9923b3-8dcd-5818-a1b0-53b788ba43f7",
	"name": "S Q2"
}, {
	"id": "94a89284-a518-55fc-b40b-054d2a570c21",
	"name": "TT S"
}, {
	"id": "0e205cea-3cea-5d47-baf9-5e35331f92a4",
	"name": "A3 Berline"
}, {
	"id": "0ef66f49-605d-562a-96fc-6cc94dbd5f3d",
	"name": "A4 Berline"
}, {
	"id": "6b844ea2-1c79-5e67-8dcf-802bb3b184fd",
	"name": "A6 Berline"
}, {
	"id": "92d71f4f-65e2-58b3-abee-00b98cd55cb4",
	"name": "Audi A8"
}, {
	"id": "51c21d18-3914-5a4b-9b6f-ed0b4b2e7f6c",
	"name": "CITIGO"
}, {
	"id": "e1eb3e9f-f412-5f83-986f-5ed5850c2835",
	"name": "FABIA"
}, {
	"id": "9dd3381a-87e7-5bea-839f-69554e2f0892",
	"name": "FABIA COMBI"
}, {
	"id": "4776fc05-616a-571c-bcb7-c232bb871f6d",
	"name": "SCALA"
}, {
	"id": "b0ac1a4f-1b2e-5b25-affa-1bfcaa7d85c5",
	"name": "KAROQ"
}, {
	"id": "08f0af9b-0ee7-5369-86c9-7953da992566",
	"name": "KODIAQ"
}, {
	"id": "9dba8b15-04a2-595c-9c4f-f4f3e61f9af4",
	"name": "OCTAVIA"
}, {
	"id": "da42480d-7363-57ec-9153-f380eab9113e",
	"name": "OCTAVIA COMBI"
}, {
	"id": "c4cd95e2-3a3b-5571-9d57-3e69b0c3018a",
	"name": "SUPERB"
}, {
	"id": "eb54afce-f1b3-562b-8414-28618ee9b175",
	"name": "SUPERB COMBI"
}, {
	"id": "efcc7d52-7db2-57c1-a04d-ee2c33d3c123",
	"name": "Caddy Van & Maxi Van"
}, {
	"id": "927de7bd-384d-5667-8c0a-ab62731de4ea",
	"name": "Caddy & Caddy Maxi"
}, {
	"id": "4cad49c5-1640-59c0-b8b6-0a602079a4cb",
	"name": "Transporter Pick-Up"
}, {
	"id": "3e141ef5-1a38-5dc4-8f9e-a4ccf98f03c5",
	"name": "Transporter Bestelwagen"
}, {
	"id": "b7751492-bb4d-5624-85c5-747199bc259c",
	"name": "Transporter Combi"
}, {
	"id": "195da836-515e-56c1-941b-7e3bd2e7f278",
	"name": "Crafter Chassis"
}, {
	"id": "abc9766e-4b30-5ea0-803a-62610a7eebf5",
	"name": "Crafter Pick-up"
}, {
	"id": "0d369a73-3d55-50cf-9ec2-2c5d0d09b5d0",
	"name": "Crafter Bestelwagen"
}, {
	"id": "00761680-42fc-5bc3-9b05-ef1a1cbfff28",
	"name": "e-Crafter"
}]

const token = {"access_token":"eyJraWQiOiJlYTlkMzVmZWQyZmM4NjBmIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI1N2M0YWQwNy1jNmYxLTRhYjgtYTVmNi03ZjlhYTI2ZDhiNTlAYXBwc192dy1kaWxhYl9jb20iLCJhdWQiOiI1N2M0YWQwNy1jNmYxLTRhYjgtYTVmNi03ZjlhYTI2ZDhiNTlAYXBwc192dy1kaWxhYl9jb20iLCJhYXQiOiJpZGVudGl0eWtpdCIsImlzcyI6Imh0dHBzOlwvXC9pZGVudGl0eS52d2dyb3VwLmlvIiwianR0IjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNTUxMTA2MzQzLCJpYXQiOjE1NTExMDI3NDMsImp0aSI6Ijc1YWEyOTA0LTgwNTgtNGUyYi1hMTljLThjN2E2ODYyM2YxOCJ9.IJyJgu5TGwm4vj3ukP2FJHpFiuIt4KZlZI6ezZyZfVAfieiJMzhVdAN-40PK6RyKfrvHhbB8iRVZ5SAlQOusQdLrB0gJNz2aOVSysx67GqOXK1wL-LBUPU3Dl7OOinoBm_3Q4z_GURCeESnCSYojY7fnhDmnepjACqCxWUl2xhbgXdkBIhDMWLGGgBVpoPxO5gWavaMfvlv4349MM4L6ZMcvGab8CjYmcQ5tYDHN2gMaGL0h7ACwmCOY8gqLaKrS2_9dokTJ9U_BEhn9sy9_9abiU9b-6Er-Wzzjrnrv3MPQWWPD2BS0SgYAD4DYDSKut7D6DAwW7dl4tYnASSfWiBHnPwgEiWfMRwmZbQMK3n1ybvV04cV82batAvwCU4MjU7q1Sp4V-0e76dtPRP5T7O8U6DTakNPOmv8n_fGerlgXVPAR8rk96vg3RAx2ZXQWcdEYLCtoAziLp2Kq0wmVF6VuP-2R9KMJlI5lRCcw-z-DId1DbVz_NntenKinA_zDPOFyGfFrGI3CPCMhUcIMVk3wZwM8oe04SfgGR2L4bGxO8yXrFZ7LVoBhAQHZbDnbROX9JDIEIOI1y2cSnyfS7WaSue7enGgJJQiFjYWNlnt34Hm8buUpRa1o5X4Rd3SXexhhVT8A5F8C9o0Ek4w3klE1HPtWsbHb3XfzoITQdIU","token_type":"bearer","expires_in":3600,"user_id":"57c4ad07-c6f1-4ab8-a5f6-7f9aa26d8b59@apps_vw-dilab_com"}

uniqueModels.forEach( (model, i) => {

	_.delay(() => axios({
		method : 'post',
		url : `https://api.productdata.vwgroup.com/v2/configurations/`,
		headers: {
			'Authorization' : 'bearer ' + token.access_token,
			'Accept' : 'application/json',
			'Content-Type' : 'application/json'
		},
		data : {
			model_id : model.id
		}
	}), 2000 * i)
})