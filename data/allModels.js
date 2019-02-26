const _ = require('lodash')
const fs = require('fs')

const allModels = [
	[{
			"id": "7471d364-bce8-5b23-95ab-92280a18554f",
			"name": "A1 Sportback"
		},
		{
			"id": "7628ffaa-5575-56e4-b9d0-c83539ab0f46",
			"name": "Q2"
		},
		{
			"id": "9201e12a-6ca8-584a-ae8c-586facabe8f0",
			"name": "SQ2"
		},
		{
			"id": "c74d9250-3915-5bc1-9330-c43e74e10101",
			"name": "TT Coupé"
		},
		{
			"id": "d1015e2a-eab2-567a-b5bf-ee4a262a2f5c",
			"name": "TT Roadster"
		},
		{
			"id": "938358f1-5ec9-5c98-885d-2b3923eda6f7",
			"name": "TTS"
		},
		{
			"id": "5139102e-96e0-5b69-95d9-e64899b4704e",
			"name": "A3 Sportback"
		},
		{
			"id": "2a301dbf-a8af-54c7-83a8-20246d7be856",
			"name": "A3 Limousine"
		},
		{
			"id": "cdfd121f-83e5-59fc-83ea-d031391d67cd",
			"name": "A3 Cabriolet"
		},
		{
			"id": "bf83faa3-31a4-593c-af66-c59fa4883964",
			"name": "S3"
		},
		{
			"id": "bb67368f-564e-5782-bf7f-da35ae552427",
			"name": "Q3"
		},
		{
			"id": "ddc1693c-bac6-56b7-86e6-dcc7d73ba3c9",
			"name": "A4"
		},
		{
			"id": "3e002e8a-86dc-58a0-9546-114d6cce70da",
			"name": "A4 Avant"
		},
		{
			"id": "ed25d46f-f83d-513d-8b79-7730e81ea2b3",
			"name": "A4 allroad quattro"
		},
		{
			"id": "ec791a17-ad35-5a9a-8104-af8fdc36b9ee",
			"name": "A5 Coupé"
		},
		{
			"id": "2160eeaa-939f-56dc-8d98-6f8f34406d74",
			"name": "A5 Sportback"
		},
		{
			"id": "5c0daa8f-8fda-55f6-b7e0-bf9cd347490d",
			"name": "A5 Cabriolet"
		},
		{
			"id": "eebdc5fc-34d0-5aa8-a8c6-cb77c9e77b8d",
			"name": "Q5"
		},
		{
			"id": "9fc6a2d0-09f3-5c59-a28c-62d55a8d0461",
			"name": "A6"
		},
		{
			"id": "5f365886-7299-5a76-955a-959664cabb6e",
			"name": "A6 Avant"
		},
		{
			"id": "2daca6bb-32f9-58a1-98e9-5b3d097df63b",
			"name": "A7 Sportback"
		},
		{
			"id": "26171a0c-9d23-54d3-8ce7-ec7191d76afb",
			"name": "Q7"
		},
		{
			"id": "1e9a1d73-ded2-56b2-b778-428f005dd03d",
			"name": "Q8"
		},
		{
			"id": "4f97316b-37d7-5cbf-86c9-19b7070f5922",
			"name": "A8"
		},
		{
			"id": "c96500e2-4f0c-5930-8826-47ba4167091a",
			"name": "e-tron"
		}
	],
	[{
			"id": "1d717e0e-31f5-5586-8ed6-682fe1f16ecf",
			"name": "A1 Sportback"
		},
		{
			"id": "254c7ed5-b98d-502e-aa17-908133253320",
			"name": "Q2"
		},
		{
			"id": "fb2ede32-5a8b-5110-923b-b0f0c9258586",
			"name": "A3 Sportback"
		},
		{
			"id": "4e5d68b6-f8a5-5c69-9029-ba4617d1f7c9",
			"name": "A3 Sedã"
		},
		{
			"id": "ce76f072-f2a9-50a6-a27a-91c79a49d920",
			"name": "A4"
		},
		{
			"id": "1e98b331-ec8b-5f8a-8637-2d1a96b91615",
			"name": "A4 Avant"
		},
		{
			"id": "9f26af60-32ff-52ae-97d2-8a65351ffa29",
			"name": "A4 allroad quattro"
		},
		{
			"id": "c627bfa4-83e8-5473-a836-b0d610512480",
			"name": "A5 Coupé"
		},
		{
			"id": "bc444132-75f9-5c18-8ee0-cc21b566821f",
			"name": "A5 Sportback"
		},
		{
			"id": "523212b2-0512-56b0-9e13-42c06bd8ed7a",
			"name": "A5 Conversível"
		},
		{
			"id": "f0f266f3-f091-5aa6-bdf3-a14390ba21a8",
			"name": "Q5"
		},
		{
			"id": "ea809f13-b1b5-589a-8126-6f083e92e8fb",
			"name": "SQ5"
		},
		{
			"id": "d7abf0c3-38ca-5999-8310-2fb02920ebe1",
			"name": "A6"
		},
		{
			"id": "a3657bb2-9761-57be-8e15-37d3c118c4c3",
			"name": "A6 Avant"
		},
		{
			"id": "e8192124-d54d-5796-b411-fdff6b5ffb9e",
			"name": "A7 Sportback"
		},
		{
			"id": "1e8c3759-3c14-5c5c-af17-ec7340410660",
			"name": "Q7"
		},
		{
			"id": "901361e2-72a2-5293-8e2b-0593e6cae2dc",
			"name": "Q8"
		},
		{
			"id": "bd6891b6-f659-5f4c-8ec2-a536135908ef",
			"name": "A8"
		},
		{
			"id": "f62c3a91-529e-508c-96b7-f8e9d1fa0742",
			"name": "e-tron"
		}
	],
	[{
			"id": "4d935137-86ef-5ef5-a09f-f4710231f60e",
			"name": "up!"
		},
		{
			"id": "40964b55-b0ef-581b-a1b4-5f343ce1e9ed",
			"name": "up! GTI"
		},
		{
			"id": "f01d11e1-def8-563e-8f48-8cc0f9dfd24b",
			"name": "Nuova Polo"
		},
		{
			"id": "aae094c7-ffe3-5a36-ab75-1ab959add64b",
			"name": "Nuova Polo GTI"
		},
		{
			"id": "8408f6d9-7829-5508-b710-b0388a8fe344",
			"name": "Golf"
		},
		{
			"id": "66586071-580a-5396-8c82-b7f6be3d4f21",
			"name": "Golf - Allestimenti Sportivi"
		},
		{
			"id": "f659303e-b42e-5134-8518-b912ad350b13",
			"name": "e-Golf"
		},
		{
			"id": "6f4829cc-46bd-54db-8ede-7d10b3ed8421",
			"name": "T-Roc"
		},
		{
			"id": "58bb15fe-19e4-5f78-86a7-0ad0b18ab387",
			"name": "Golf Variant"
		},
		{
			"id": "b32b7256-bef7-50ee-a9ad-7e403e23b76a",
			"name": "Touran"
		},
		{
			"id": "9396f39f-918e-5e1b-b76e-4f7d8a7de022",
			"name": "Nuova Tiguan"
		},
		{
			"id": "0bb14d0e-e05f-520e-b9e5-1ddf8825f42f",
			"name": "Nuova Tiguan Allspace"
		},
		{
			"id": "38dc315f-346d-5647-9820-a7cbd1f65e72",
			"name": "Passat"
		},
		{
			"id": "b99a1775-2660-585d-9e6b-6b0d6bf1b85b",
			"name": "Passat Variant"
		},
		{
			"id": "8efbbae6-974a-59f1-b327-323f52b72096",
			"name": "Arteon"
		},
		{
			"id": "831efad1-3add-562a-a28f-4fe34793f021",
			"name": "Sharan"
		},
		{
			"id": "10c583d7-d5a5-5a79-b212-aafbe09080c7",
			"name": "Nuova Touareg"
		},
		{
			"id": "40cc7734-1ef8-5b98-bdcd-540b2fc2278b",
			"name": "A1 Sportback"
		},
		{
			"id": "85f081c9-5891-5253-ba4b-983c4dacedc3",
			"name": "Q2"
		},
		{
			"id": "8947f289-37c9-5042-9117-b89133753d2d",
			"name": "SQ2"
		},
		{
			"id": "6c418a7c-f42f-5e47-9412-099b7e023b2e",
			"name": "TT Coupé"
		},
		{
			"id": "fcc6543e-2534-5ea7-ad33-0c29767c69a4",
			"name": "TT Roadster"
		},
		{
			"id": "616f347f-3c25-56d3-8198-872a21d7f7a7",
			"name": "TTS"
		},
		{
			"id": "62c9a48c-5dbb-5a56-bf63-30b490a1aa00",
			"name": "A3 Sportback"
		},
		{
			"id": "125202ec-dc83-5660-a8ea-d329e225f873",
			"name": "A3 Berlina"
		},
		{
			"id": "871803dc-3afb-5a2b-8271-60e0fb5494bc",
			"name": "A3 Cabriolet"
		},
		{
			"id": "7f52eecf-8c95-50da-9d44-aa0d26ac1b07",
			"name": "S3"
		},
		{
			"id": "e5565f9c-e850-5c5e-ba66-6efb85098795",
			"name": "RS 3"
		},
		{
			"id": "49abaaef-9b6e-5b16-bb64-dd4e2eed4141",
			"name": "Q3"
		},
		{
			"id": "2e0bd628-b777-5b70-ae0a-8936b5608f6c",
			"name": "A4"
		},
		{
			"id": "f75e763c-50dc-5ba9-933c-1ead389ebdd9",
			"name": "A4 Avant"
		},
		{
			"id": "8c2ad8df-93b5-557b-b001-5add1adec6b2",
			"name": "A4 allroad quattro"
		},
		{
			"id": "23eea9d4-9d8d-5211-99b6-97bc58e63e8f",
			"name": "S4/S4 Avant"
		},
		{
			"id": "a2dcf2a7-d37b-56cf-a8d2-6e35609f885d",
			"name": "RS 4 Avant"
		},
		{
			"id": "ff2ea4da-f16b-5ce8-ab08-f82470f1a95e",
			"name": "A5 Coupé"
		},
		{
			"id": "6ce13ca2-d687-5274-943d-adc9d734a7cb",
			"name": "A5 Sportback"
		},
		{
			"id": "caae504c-14e2-5d81-8516-f6871168e261",
			"name": "S5"
		},
		{
			"id": "b2ba8c20-f607-5bee-bd83-4182c7c165ea",
			"name": "A5 Cabriolet"
		},
		{
			"id": "46ca856b-668b-5999-82e3-0d8b85d92fee",
			"name": "RS 5"
		},
		{
			"id": "0070b6e2-ee83-59ff-b2c8-0522d5a2823e",
			"name": "Q5"
		},
		{
			"id": "9eca6f3e-5fc7-58ab-9c11-90c2fc8c5460",
			"name": "SQ5"
		},
		{
			"id": "f4d3e18d-ab16-53c0-95bc-59a48cf19d23",
			"name": "A6"
		},
		{
			"id": "90fd2274-5404-50d3-b3d1-7eba8a9d9084",
			"name": "A6 Avant"
		},
		{
			"id": "dc0fdbca-3253-5131-b180-d06703d6829a",
			"name": "A6 allroad quattro (C7)"
		},
		{
			"id": "8b4bcd0e-b65a-520e-991e-6d3b38427f63",
			"name": "A7 Sportback"
		},
		{
			"id": "04c5774e-de43-52ef-bae0-3cfc87435cc3",
			"name": "Q7"
		},
		{
			"id": "ab98208d-fae1-507a-a3b4-9066801e13c2",
			"name": "Q8"
		},
		{
			"id": "fbef303d-56a2-5f44-876d-79e7b6aaddab",
			"name": "A8"
		},
		{
			"id": "0e898978-9142-5386-8039-d5eca579f04c",
			"name": "R8 Coupé"
		},
		{
			"id": "5c953895-eeaa-58fd-9632-e3a3329dea07",
			"name": "R8 Spyder"
		},
		{
			"id": "a9da425c-7a26-56d5-9810-686fb938d59e",
			"name": "e-tron"
		},
		{
			"id": "30004eb3-442e-5129-bd26-8023c580743a",
			"name": "Citigo"
		},
		{
			"id": "cd204992-255c-5553-b184-60f1b8fe4c9a",
			"name": "Fabia"
		},
		{
			"id": "e27390fd-e2a2-57d5-ad4f-a2d63371c851",
			"name": "Fabia Wagon"
		},
		{
			"id": "e6b5af0b-2070-50f7-be07-79348b25ee3e",
			"name": "Scala"
		},
		{
			"id": "73ccded6-281f-534b-a8a8-85bceaf564d8",
			"name": "Rapid Spaceback"
		},
		{
			"id": "01f420e5-0db7-5d3d-a97f-15ca9a2ac824",
			"name": "Karoq"
		},
		{
			"id": "47b9923e-b75b-5c6f-ba0c-a404335b8e58",
			"name": "Kodiaq"
		},
		{
			"id": "7f317da5-deb5-5ff6-a449-6c9b95e6669e",
			"name": "Octavia"
		},
		{
			"id": "722f536e-7fe8-519b-be42-32c0a0131eeb",
			"name": "Octavia Wagon"
		},
		{
			"id": "e908b5a8-9570-547a-8144-788c72c2cdf9",
			"name": "Superb"
		},
		{
			"id": "fb79636a-bd63-5559-a829-aaa1e7fb482c",
			"name": "Superb Wagon"
		},
		{
			"id": "0ff35b5b-c6d8-5964-be38-dc8d301977fa",
			"name": "Caddy Furgone"
		},
		{
			"id": "32d30daa-28c0-5eb4-9a31-b1bfa730976b",
			"name": "Caddy Kombi"
		},
		{
			"id": "dd328d79-634e-5f69-8c7e-aeb7c73676d0",
			"name": "Caddy"
		},
		{
			"id": "f2cd5775-6aef-51aa-88b2-d00a584cd876",
			"name": "Caddy Beach"
		},
		{
			"id": "078659ae-4b39-5510-89d8-794262ff90e1",
			"name": "Allestimenti Focaccia"
		},
		{
			"id": "b1991ff3-3a3d-5541-8ee5-f62578527667",
			"name": "Transporter Telaio"
		},
		{
			"id": "64b7136d-7ca8-5447-bcb7-c0480209c92a",
			"name": "Transporter Furgone"
		},
		{
			"id": "735fe577-9431-5a85-9760-61b3f66240d0",
			"name": "Transporter Kombi"
		},
		{
			"id": "33ff731c-1f21-5a1a-a929-95d55803e35a",
			"name": "Allestimenti Onnicar, Lauri e Lamberet"
		},
		{
			"id": "9ef41afb-1ebb-537b-b71a-7441cd669ce1",
			"name": "Crafter Camioncino"
		},
		{
			"id": "63ea3f24-2b74-5e6a-a382-3344d53d845d",
			"name": "Crafter Autotelaio"
		},
		{
			"id": "cd16c669-c811-58f2-be1d-742190f64e54",
			"name": "Crafter Furgone"
		},
		{
			"id": "1f33e4c9-23ff-56cc-91be-e78ba3cf67b8",
			"name": "Crafter Ribaltabile Trilaterale"
		},
		{
			"id": "3e0c0760-2d06-516c-b26d-ae37ddbe6c10",
			"name": "Crafter con Furgonatura"
		},
		{
			"id": "674a3193-b8d1-5d4b-a52c-7c6c263b41bb",
			"name": "Crafter Pianalato"
		},
		{
			"id": "c37e8316-26d6-515a-99a0-7b8c582f0b65",
			"name": "Crafter Telaio Cabinato senza paratia"
		},
		{
			"id": "2f112c8b-64ac-5077-ae70-2e43c9ae5248",
			"name": "Amarok"
		},
		{
			"id": "aebcfb75-4885-5a81-a769-6f0bc13dd45f",
			"name": "Caravelle"
		},
		{
			"id": "85df1c52-97bf-5ff7-b56c-e1994506101d",
			"name": "Multivan"
		},
		{
			"id": "237e4e05-b982-5460-987e-b1d8ab7ea923",
			"name": "California"
		},
		{
			"id": "0f26d10a-b098-5518-84ca-b2417c49f1e0",
			"name": "Mii"
		},
		{
			"id": "ae27bf9f-196b-532f-9988-f97d9fac1829",
			"name": "Ibiza"
		},
		{
			"id": "edb1b910-0e28-510a-8083-53eec93302db",
			"name": "Leon"
		},
		{
			"id": "8f31ef77-e497-5f6e-8e8c-0855176bb5f3",
			"name": "Arona"
		},
		{
			"id": "cb887960-ca8b-599d-83df-8ef2d72f376e",
			"name": "Ateca"
		},
		{
			"id": "f191813e-d126-5f1f-b412-b8e42d01231a",
			"name": "Alhambra"
		},
		{
			"id": "2a817c21-af10-557a-99de-31a586be105c",
			"name": "Tarraco"
		}
	],
	[{
			"id": "4c1de8bd-9293-5adc-8722-26a236d8f660",
			"name": "Mii"
		},
		{
			"id": "825d805f-7524-529d-bdba-d98462930d08",
			"name": "Ibiza"
		},
		{
			"id": "3f952ac8-b203-5a66-abb5-19f4b467046e",
			"name": "Ateca"
		}
	],
	[{
			"id": "09c72417-a6bd-55a7-b365-cc6d432106ad",
			"name": "Caddy Użytkowe"
		},
		{
			"id": "8ab3c86b-2ba1-55bf-88c0-4a918f01b642",
			"name": "Caddy Osobowe"
		},
		{
			"id": "b10e0826-9923-5f23-8143-7e2ca704825c",
			"name": "Caddy Beach"
		},
		{
			"id": "24874160-dd50-572a-b91f-3117616a5fa1",
			"name": "T6 Transporter Podwozie"
		},
		{
			"id": "9e3e7fb9-e603-5c3f-b465-391578bba581",
			"name": "T6 Transporter Skrzyniowy"
		},
		{
			"id": "cc483158-c997-5d67-812a-6f10c7dc088f",
			"name": "T6 Transporter Furgon"
		},
		{
			"id": "566e594b-7c85-5d0a-a18c-ad71036bcb26",
			"name": "T6 Transporter Kombi"
		},
		{
			"id": "a4a54a64-fccf-589e-8622-1542f824561d",
			"name": "T6 Caravelle"
		},
		{
			"id": "f0966d28-5a08-58e5-bd6f-12567292c30f",
			"name": "T6 California"
		},
		{
			"id": "d3124d73-194f-5896-8b88-eb190dbdbf27",
			"name": "T6 Multivan"
		},
		{
			"id": "5614af66-bea5-544f-aef3-294cbf5e8f6e",
			"name": "Nowy Crafter Podwozie"
		},
		{
			"id": "2bb77284-4cef-5484-a296-e629c4dab06c",
			"name": "Nowy Crafter Skrzyniowy"
		},
		{
			"id": "c68f1cfc-5275-5dd3-abc6-517525161914",
			"name": "Nowy Crafter Furgon"
		},
		{
			"id": "171ffd5f-5209-52d8-b6b7-13d1ee309cc6",
			"name": "Amarok"
		},
		{
			"id": "b418940d-ce51-50e7-b4a7-03eaa99f5e82",
			"name": "Mii"
		},
		{
			"id": "bce523c2-96fe-5b9e-bbd2-b178890ef97b",
			"name": "Nowa Ibiza"
		},
		{
			"id": "cc4daf32-6f9b-5b6d-9efe-7b44ecc76f40",
			"name": "Leon"
		},
		{
			"id": "36f75dc7-72e0-5156-bfcb-fd14f0aeadc9",
			"name": "Toledo"
		},
		{
			"id": "e4b49c84-111f-5ec3-9160-d94aaf733b73",
			"name": "Arona"
		},
		{
			"id": "e6894f56-1bbd-5fa6-a204-d56adad81fb3",
			"name": "Ateca"
		},
		{
			"id": "73fb5fac-b782-5aa6-bffe-8d6a33e73dc1",
			"name": "Alhambra"
		},
		{
			"id": "70abe71b-2536-53f5-83c6-ce1c4a51d679",
			"name": "Tarraco"
		},
		{
			"id": "8b52d9b9-4c35-550e-8377-8d7cab8cabb8",
			"name": "CUPRA"
		}
	],
	[{
			"id": "48e104e9-92bf-56b8-b03f-9f2a0f1aaa1c",
			"name": "up!"
		},
		{
			"id": "30d3fdc6-ae46-59ef-8828-6803c15d35fc",
			"name": "e-up!"
		},
		{
			"id": "ffba50aa-221e-5b02-b474-534f267da9a6",
			"name": "Polo"
		},
		{
			"id": "c4da9fd2-f1fa-51c1-82d3-6f53713369ec",
			"name": "Der neue T-Cross"
		},
		{
			"id": "ce636372-8196-50ab-8cfe-a5875cf8d16f",
			"name": "Golf"
		},
		{
			"id": "c3fc2f05-47ea-5658-9f66-193ad70b58af",
			"name": "e-Golf"
		},
		{
			"id": "f0ca812d-d9f3-54e6-bb37-55b98dbe9fbc",
			"name": "Neuer T-Roc"
		},
		{
			"id": "ef81bd36-be5b-5551-a3a8-4189e87bc4de",
			"name": "Neuer Golf Sportsvan"
		},
		{
			"id": "a19b2697-5c53-5b48-8eb3-f6df1ab48fc0",
			"name": "Golf Variant"
		},
		{
			"id": "f7a3029d-d2c4-5e80-b7ce-068705ffa92d",
			"name": "Touran"
		},
		{
			"id": "15039b88-fdac-53d6-b2e0-48713c9872fd",
			"name": "Tiguan"
		},
		{
			"id": "024bd3fd-e6da-578c-8500-d6591e273f88",
			"name": "Neuer Tiguan Allspace"
		},
		{
			"id": "966522df-d844-5141-8e6d-5ecd12f344b3",
			"name": "Neuer Passat"
		},
		{
			"id": "d15475ba-1836-5c48-bd7d-fbd39e9455e4",
			"name": "Neuer Passat Variant"
		},
		{
			"id": "c05bd448-7bd2-5b5e-b7ae-9ea537d02331",
			"name": "Arteon"
		},
		{
			"id": "f756c941-8c97-522d-9424-e1f4afd9655b",
			"name": "Sharan"
		},
		{
			"id": "dcbd5157-c6c9-5743-97aa-35871ec4c9f3",
			"name": "Neuer Touareg"
		},
		{
			"id": "4ff73efa-dbe2-5430-a0d8-794e49228209",
			"name": "Citigo"
		},
		{
			"id": "dab21e72-9048-5aae-b2b9-c2a265115c7b",
			"name": "Fabia"
		},
		{
			"id": "2aa4b907-aeca-5fe0-8a12-44ec88f69ede",
			"name": "Fabia Combi"
		},
		{
			"id": "0b141b77-4ec2-5d2c-b194-225acc613071",
			"name": "Scala"
		},
		{
			"id": "70ef0276-25b8-5a37-810f-5c815a8c889a",
			"name": "Rapid Spaceback"
		},
		{
			"id": "d5cadfc5-b663-5284-afc1-0e9c1756bb65",
			"name": "Karoq"
		},
		{
			"id": "e6372c85-d658-5039-af8b-2783a077282b",
			"name": "Kodiaq"
		},
		{
			"id": "ceb699f9-fbf7-5fb2-82f6-ad93a62b4ac5",
			"name": "Octavia"
		},
		{
			"id": "63ffe326-b63a-56aa-b71d-3848083c5309",
			"name": "Octavia Combi"
		},
		{
			"id": "164a3de6-f107-5f10-86fc-1823aaf3653d",
			"name": "Superb"
		},
		{
			"id": "dbb6cdac-2139-5002-8eb1-85aacd13f97f",
			"name": "Superb Combi"
		}
	],
	[{
			"id": "3f9e707c-c7b7-5673-9594-9ca9ba2937af",
			"name": "Polo"
		},
		{
			"id": "09c1612b-b3bc-5e36-bf94-f46e721b40c0",
			"name": "New T-Roc"
		},
		{
			"id": "56d8181d-cb95-54b2-aaf3-e8e3bcc6b310",
			"name": "Arteon"
		},
		{
			"id": "e2817b7c-d8dd-5195-a017-a35cd762398f",
			"name": "New Touareg"
		}
	],
	[{
			"id": "3f9e707c-c7b7-5673-9594-9ca9ba2937af",
			"name": "Polo"
		},
		{
			"id": "09c1612b-b3bc-5e36-bf94-f46e721b40c0",
			"name": "New T-Roc"
		},
		{
			"id": "56d8181d-cb95-54b2-aaf3-e8e3bcc6b310",
			"name": "Arteon"
		},
		{
			"id": "e2817b7c-d8dd-5195-a017-a35cd762398f",
			"name": "New Touareg"
		}
	],
	[{
			"id": "9c783abd-9ac8-541f-b187-fc94ea5d1219",
			"name": "The up!"
		},
		{
			"id": "9d44d010-a00b-5226-a6ea-9de2400d10e4",
			"name": "The Polo"
		},
		{
			"id": "1fa872e5-8287-5312-839e-d1f1a7ec5726",
			"name": "The Golf"
		},
		{
			"id": "2577a61d-1e00-5fa1-91fd-b6766ca1fb91",
			"name": "The e-Golf"
		},
		{
			"id": "01db5a44-bc68-5a28-93bd-37c5f4a91989",
			"name": "The T-Roc"
		},
		{
			"id": "daf4a298-6d1f-5b87-918e-19cd2b591dbb",
			"name": "The Touran"
		},
		{
			"id": "5fcf74c2-a933-5182-8c4d-cd258d354a7e",
			"name": "The Tiguan"
		},
		{
			"id": "ad23d17e-e0e2-54a6-98fc-a96614c8b9aa",
			"name": "The Tiguan Allspace"
		},
		{
			"id": "d73b4c60-c09d-5abb-a0fd-8bf03eaf6022",
			"name": "The Passat Saloon"
		},
		{
			"id": "2b03c455-13d7-521c-bb76-c715dbf5d5e4",
			"name": "The Passat Estate"
		},
		{
			"id": "fef77daa-d7a1-5b2c-8dd0-8f8ddda70434",
			"name": "The Arteon"
		},
		{
			"id": "896ecaeb-c756-5429-bcbc-da5a0b3d293f",
			"name": "The Sharan"
		},
		{
			"id": "868f49b2-6600-5822-a36d-c38cf24d90be",
			"name": "The new Touareg"
		},
		{
			"id": "fca51934-2cce-501f-927e-5abec80de67f",
			"name": "MII"
		},
		{
			"id": "8946ecd9-ddca-57e4-8b29-7b49de28a694",
			"name": "IBIZA"
		},
		{
			"id": "70a55e4d-db84-548c-ae92-97786c48c462",
			"name": "LEON"
		},
		{
			"id": "8b18d4f4-cc9d-5c48-8c1d-b6e3cfb0b521",
			"name": "ARONA"
		},
		{
			"id": "e7242e83-06f3-5879-834f-df04130fd0af",
			"name": "ATECA"
		}
	],
	[{
			"id": "da03c068-aaa8-57fd-8fe6-52aebd3a0197",
			"name": "up!"
		},
		{
			"id": "65ef807b-edf4-5859-8bfa-364a625cf598",
			"name": "Polo"
		},
		{
			"id": "7a27014a-22e4-526e-b513-02eb9bd97236",
			"name": "Golf"
		},
		{
			"id": "2a20af90-e595-5bb4-b03f-0ca5b57e8461",
			"name": "T-Roc"
		},
		{
			"id": "546ec518-cb10-5a92-864b-2f2398cb7693",
			"name": "Golf SV"
		},
		{
			"id": "5a0b8a73-4ec8-5d1b-9e2c-d1708ca80f2d",
			"name": "Golf Estate"
		},
		{
			"id": "65b5ba55-e148-5306-9f85-56754eda6c3e",
			"name": "Touran"
		},
		{
			"id": "a4916dfb-eace-54f9-b4af-e233f0ccf9fc",
			"name": "Tiguan"
		},
		{
			"id": "8fa838a1-70a1-5a3e-b326-a3025b18a6cb",
			"name": "Tiguan Allspace"
		},
		{
			"id": "8a21294b-36a8-50cf-9c5a-6c03bd784d5f",
			"name": "Passat Saloon"
		},
		{
			"id": "70f99a00-4d43-51e5-972b-b6c98938728e",
			"name": "Passat Estate"
		},
		{
			"id": "2c3debda-fd2f-5c0a-baba-bb7603568e8a",
			"name": "Arteon"
		},
		{
			"id": "4332a539-3ee7-5c23-ae11-74e6bc8718a5",
			"name": "Sharan"
		},
		{
			"id": "6b7021a4-c70e-58f1-badb-3f4919754559",
			"name": "New Touareg"
		},
		{
			"id": "9190960f-b0ec-5bda-bb5e-0a56262899e9",
			"name": "A1 Sportback"
		},
		{
			"id": "1e483753-eb21-549c-8222-e4bd8de681ea",
			"name": "Q2"
		},
		{
			"id": "12695277-2419-5f54-9427-9b81aa7ea696",
			"name": "SQ2"
		},
		{
			"id": "020c1f05-f9e8-53fb-8a58-8216c8e5b05c",
			"name": "TT Coupé"
		},
		{
			"id": "e967508a-ee91-5437-bf8a-65f67af95277",
			"name": "TT Roadster"
		},
		{
			"id": "0d5fea09-0dcf-5cdd-b756-29759bd7d800",
			"name": "TTS"
		},
		{
			"id": "f46f7145-780d-5a84-96f2-b4b50a662e84",
			"name": "TT RS"
		},
		{
			"id": "99120d07-ea5a-53e2-b406-471e2046ace7",
			"name": "A3 Sportback"
		},
		{
			"id": "c1af316f-3385-5382-9f61-2e010458b046",
			"name": "A3 Saloon"
		},
		{
			"id": "440e01f9-5362-5a59-911a-7a376059cab1",
			"name": "A3 Cabriolet"
		},
		{
			"id": "09a41284-5dea-5e08-a7df-efbda8ad62ac",
			"name": "S3"
		},
		{
			"id": "9b483896-1e37-5795-941f-0f928adf82f3",
			"name": "RS3"
		},
		{
			"id": "e5766e98-9e11-5efa-baaf-263e75b7363d",
			"name": "Q3"
		},
		{
			"id": "6b92bc16-afac-5d88-80d2-cfad2c390d24",
			"name": "A4"
		},
		{
			"id": "a882b8ea-f79b-5023-836b-781fb0577ac7",
			"name": "A4 Avant"
		},
		{
			"id": "a04dc562-43e3-5e31-8d5f-6b36f24f463e",
			"name": "A4 allroad quattro"
		},
		{
			"id": "8a6cbb7c-85b2-5e8b-95bb-9960220a0f00",
			"name": "RS 4 Avant"
		},
		{
			"id": "964c86b8-2c93-55a6-a3ad-0c5f4475a13e",
			"name": "A5 Coupé"
		},
		{
			"id": "3ba3b597-4cd7-554b-af37-58f7f0708438",
			"name": "A5 Sportback"
		},
		{
			"id": "51e16b9d-0afc-5e1c-9f51-cec9c167dbba",
			"name": "A5 Cabriolet"
		},
		{
			"id": "8335c031-ab53-5e4a-ae16-60db0b8e0897",
			"name": "RS 5"
		},
		{
			"id": "ec75338f-ef6f-56f1-ba56-1beae6f761c4",
			"name": "Q5"
		},
		{
			"id": "9626c455-dc4e-5387-8a8a-41e9c6eb1dac",
			"name": "SQ5"
		},
		{
			"id": "6269671a-4f92-5490-8797-ea8b8bd9072f",
			"name": "A6"
		},
		{
			"id": "69025ed8-b488-5c09-9472-2d1289be110f",
			"name": "A6 Avant"
		},
		{
			"id": "6b2f0e0e-7fcb-5eaf-9928-cef94b05b339",
			"name": "S6 / S6 Avant"
		},
		{
			"id": "73ede16a-8cfd-5df7-883a-8a975d3c3760",
			"name": "A7 Sportback"
		},
		{
			"id": "6f5c93dd-d52c-5588-bb68-db23b5de588d",
			"name": "S7 Sportback"
		},
		{
			"id": "ad75c2b5-697d-525c-ac50-2517bce5a25c",
			"name": "Q7"
		},
		{
			"id": "839c21e3-cd97-58f3-b75e-e7d2acf153e4",
			"name": "A8"
		},
		{
			"id": "ed75da51-4528-5686-8354-b3bd38d2f09f",
			"name": "R8 Coupé"
		},
		{
			"id": "3547d8c2-3fb7-51f4-a8fe-983aa12e7d80",
			"name": "R8 Spyder"
		},
		{
			"id": "80a11d5f-443a-53d2-b214-55ba87f19c66",
			"name": "e-tron"
		},
		{
			"id": "0ac28136-111f-5b23-b802-72089b42abb0",
			"name": "Citigo 3-Door"
		},
		{
			"id": "122b73cd-4d05-5a5c-ab6f-ea36edf44605",
			"name": "Citigo 5-Door"
		},
		{
			"id": "9313aab0-4e31-5599-9a22-8e26022d11d6",
			"name": "Fabia Hatch"
		},
		{
			"id": "54bd9b12-1460-557a-b0d3-bb3b5e574a49",
			"name": "Fabia Estate"
		},
		{
			"id": "86249d53-eaa5-595e-bc73-a4cba6835c35",
			"name": "Rapid Spaceback"
		},
		{
			"id": "c66870f8-1b6d-51bc-9004-513679b9bb65",
			"name": "Karoq"
		},
		{
			"id": "e7a86df4-919c-510d-b923-70fa39a68b59",
			"name": "Kodiaq"
		},
		{
			"id": "615cdda5-d02f-5f8e-b154-37f9212be989",
			"name": "Octavia Hatch"
		},
		{
			"id": "802fba1a-f8e3-55b5-b20b-66ff51508a6d",
			"name": "Octavia Estate"
		},
		{
			"id": "40801d52-fde7-524b-a86a-b892235e1217",
			"name": "Superb Hatch"
		},
		{
			"id": "31aee406-231e-50f4-8e63-0e180d6cb7cc",
			"name": "Superb Estate"
		},
		{
			"id": "6024aa91-50a0-5e0c-9df7-e57b40b8497b",
			"name": "Crafter Tipper"
		},
		{
			"id": "4e28aa3b-d532-5e57-a0f0-8d775ce0cda0",
			"name": "Crafter Dropside"
		},
		{
			"id": "7c5df219-1025-5648-8186-34fe1fcf4b0d",
			"name": "Caddy Panel van"
		},
		{
			"id": "8b9c8a52-58fa-53cf-8c92-18909e528524",
			"name": "Caddy Kombi"
		},
		{
			"id": "c5e75d98-6a21-586a-96dd-fceb92940abc",
			"name": "Caddy Life"
		},
		{
			"id": "c5bb3574-a11d-598d-9517-6c407e18e0c9",
			"name": "Transporter Single Cab"
		},
		{
			"id": "24b6b814-28b5-5ab3-aff0-39435c01093a",
			"name": "Transporter Double Cab"
		},
		{
			"id": "c134e5e5-15c3-5d6d-8adb-ee668828b416",
			"name": "Transporter Zugkopf"
		},
		{
			"id": "fe30e757-8b1a-554a-9273-2953bb917dc5",
			"name": "Transporter Panel van"
		},
		{
			"id": "04a3f3b7-29dc-50e5-b16a-767975499cca",
			"name": "Transporter Kombi"
		},
		{
			"id": "4d6ccd1b-ce67-57f7-9112-739747123c98",
			"name": "Transporter Window van"
		},
		{
			"id": "94a5d663-52ef-5391-988d-40fa338fdc47",
			"name": "Transporter Shuttle"
		},
		{
			"id": "b6aecbba-f28c-5e1b-8e32-10eed3253915",
			"name": "California"
		},
		{
			"id": "794349bd-741d-50cc-a303-cfee1112cfcf",
			"name": "Caravelle"
		},
		{
			"id": "a568a429-8e7d-5a8a-aea7-8ead0702c905",
			"name": "Crafter Luton Van"
		},
		{
			"id": "d6760d1b-2a01-5691-a6ec-b774edbdb644",
			"name": "Crafter Single Cab"
		},
		{
			"id": "7214da7d-6f62-5048-b645-9fcbe1fa21df",
			"name": "Crafter Double Cab"
		},
		{
			"id": "a4a24644-ae6f-543d-a706-2a421f8c77d4",
			"name": "Amarok"
		},
		{
			"id": "4753f1bc-1d8a-5e7b-9a42-4c0ab1a5b02f",
			"name": "Crafter Panel van"
		},
		{
			"id": "0c952c96-52b4-5262-a8b8-0d37a63cb9b3",
			"name": "Mii MY19"
		},
		{
			"id": "cf623e3b-265b-51b3-bd9a-c6bda06a3bc0",
			"name": "IBIZA MY19"
		},
		{
			"id": "5db241ec-5fcc-5df5-a0a0-5fb6231e92ff",
			"name": "LEON MY19"
		},
		{
			"id": "9fc72abc-7c63-5ebe-9590-1df0efbf4796",
			"name": "ARONA MY19"
		},
		{
			"id": "c8539e4e-e650-51da-9d62-c84a25a4ce75",
			"name": "ATECA MY19"
		},
		{
			"id": "a0ea05ec-18ac-5a31-a2e8-0ba74912cd66",
			"name": "ALHAMBRA MY19"
		},
		{
			"id": "d2ec5c14-d784-53f2-9aea-1ed0c85c033e",
			"name": "TARRACO"
		}
	],
	[{
			"id": "0eaab84e-34b6-5839-901a-78c37de1f670",
			"name": "up!"
		},
		{
			"id": "2974b3bd-18ef-53a5-92e2-6c93dc0f71ad",
			"name": "Polo"
		},
		{
			"id": "02004aa0-d0e6-5e3a-b928-110843702fcb",
			"name": "Golf"
		},
		{
			"id": "4a72f28b-a73f-57b5-8e65-e3f93bfb4ad3",
			"name": "e-Golf"
		},
		{
			"id": "2bdb91a4-6dd7-5c7e-a11c-f4385c55a480",
			"name": "T-Roc"
		},
		{
			"id": "0036a298-08e2-57bd-8899-63b8ca03ab5c",
			"name": "Golf Sportsvan"
		},
		{
			"id": "269f3c16-fcb5-5682-911b-24e6079bf8d0",
			"name": "Golf SW"
		},
		{
			"id": "a252e3d0-c4a5-5fd0-a92d-24d04fb15edd",
			"name": "Touran"
		},
		{
			"id": "6a8be476-5a27-594c-91c5-9eb03e2ef775",
			"name": "Tiguan"
		},
		{
			"id": "19473b35-c4e6-5759-a100-816129ad636a",
			"name": "Tiguan Allspace"
		},
		{
			"id": "54a62984-1089-5aba-bd9f-31c7752bb8c0",
			"name": "Passat"
		},
		{
			"id": "bbab34f4-3c4e-5430-aa1b-ada21b1f0e36",
			"name": "Passat SW"
		},
		{
			"id": "a53dce04-47b4-5674-aa57-a400254bddef",
			"name": "Passat Alltrack"
		},
		{
			"id": "69b59e29-7b46-5d74-bd0a-c3515f8c0bcb",
			"name": "Arteon"
		},
		{
			"id": "cbdb532c-8b73-52e8-a8cc-6ecab69f2688",
			"name": "Sharan"
		},
		{
			"id": "73d84e86-e8f8-5f48-bd8d-2606af976b63",
			"name": "Nouveau Touareg"
		},
		{
			"id": "3d0bd0e1-72c7-57b3-a7f8-137446e78f76",
			"name": "Amarok"
		},
		{
			"id": "fedd2f91-5311-5cd2-be6b-862a037d30bc",
			"name": "Caddy Van"
		},
		{
			"id": "6cce81b5-964c-52b5-a311-35ad0d8446a9",
			"name": "Caddy"
		},
		{
			"id": "98c91b04-fb82-5af6-8cfd-1d7b59fb0d7e",
			"name": "Transporter"
		},
		{
			"id": "3e0252e4-edfe-59c1-8368-c4402ec86110",
			"name": "Caravelle"
		},
		{
			"id": "62b06ead-95d4-51c5-905d-077e2bd2adb9",
			"name": "Multivan"
		},
		{
			"id": "d0a3d237-789c-5f58-ad22-5dff4688b233",
			"name": "California"
		},
		{
			"id": "83bff632-f138-5568-99b1-6db204d2255b",
			"name": "Crafter"
		}
	],
	[{
			"id": "d7d879ee-3b0e-5451-843a-97510c3fb651",
			"name": "Polo"
		},
		{
			"id": "42285371-128a-515f-a987-82271452805a",
			"name": "Nuevo T-Cross"
		},
		{
			"id": "52fe8cb5-012e-5ae7-b3e7-fd1c1e3f6d32",
			"name": "Golf"
		},
		{
			"id": "932184cb-37c6-591d-988f-4968b8a02043",
			"name": "e-Golf"
		},
		{
			"id": "649ad025-90b8-598f-8d12-5ee4f64bcc09",
			"name": "Nuevo T-Roc"
		},
		{
			"id": "07e33913-e2bf-5489-b113-7561cc57d66c",
			"name": "Golf Sportsvan"
		},
		{
			"id": "46d6d62c-1fcf-5b03-b8c8-71fa47a11228",
			"name": "Golf Variant"
		},
		{
			"id": "52175bf6-5771-5d3a-bca7-7ff7b0dbd45e",
			"name": "Touran"
		},
		{
			"id": "588ab81a-fb27-59bd-b6c7-4324412759fa",
			"name": "Tiguan"
		},
		{
			"id": "883b67f9-28ea-5cbc-bcbf-1149b83c45b8",
			"name": "Tiguan Allspace"
		},
		{
			"id": "ea9e97de-6cc9-54bc-831d-cbda2f94a94c",
			"name": "Passat"
		},
		{
			"id": "c7d196e0-2207-55f3-9056-461a054ec541",
			"name": "Passat Variant"
		},
		{
			"id": "7d1019d4-c4a4-5b30-bba9-0971da846e9f",
			"name": "Passat Alltrack"
		},
		{
			"id": "48b15b3d-11c2-5192-8d64-2e825da4007f",
			"name": "Arteon"
		},
		{
			"id": "0ca030c8-8750-55c9-852b-e4f9c2f0811b",
			"name": "Sharan"
		},
		{
			"id": "e8b3dee8-d160-5cd0-b8c1-b95969744755",
			"name": "Nuevo Touareg"
		},
		{
			"id": "45eaddfd-c35c-5aa1-9575-b38524ec5637",
			"name": "A1 Sportback"
		},
		{
			"id": "e5b6eef0-7df4-52b6-8c5f-ef2b14891567",
			"name": "Q2"
		},
		{
			"id": "c16f6c9f-aa36-5a83-b893-bd1958405345",
			"name": "SQ2"
		},
		{
			"id": "aa9086e3-a9e9-5a66-8388-76e95591c4ca",
			"name": "TT Coupé"
		},
		{
			"id": "de657878-42a9-53b0-a993-8617ddda0566",
			"name": "TT Roadster"
		},
		{
			"id": "f3e9bf9c-e7af-5ec8-a3e4-4d1e20b98093",
			"name": "TTS"
		},
		{
			"id": "b24a6255-cba3-5bc4-96d9-e74829a3e618",
			"name": "TT RS"
		},
		{
			"id": "464a86ba-b5b9-5155-890e-33abe6cc4a79",
			"name": "A3 Sportback"
		},
		{
			"id": "1cf3f736-dc4f-5e2a-95bb-ee737c8e7b35",
			"name": "A3 berlina"
		},
		{
			"id": "c88f9d91-6667-537a-a062-27d52c527dfa",
			"name": "A3 Cabrio"
		},
		{
			"id": "1ed50f1a-9078-5b17-b7e8-f931f014e6f3",
			"name": "S3"
		},
		{
			"id": "cb54ca62-3a58-56ed-a2b8-5f0142764b70",
			"name": "RS 3"
		},
		{
			"id": "0572f0ce-5b90-51b6-b51d-4dff05dd7ac0",
			"name": "Q3"
		},
		{
			"id": "fbf35652-da19-5d09-b175-8525682dc7f8",
			"name": "A4"
		},
		{
			"id": "1035b77d-850c-56d7-9ebb-b0018ef3c11c",
			"name": "A4 Avant"
		},
		{
			"id": "68f58582-bbc2-5dda-84a3-526cbcae740c",
			"name": "A4 allroad quattro"
		},
		{
			"id": "8f238190-3185-5a79-969f-388b0e92c401",
			"name": "RS 4 Avant"
		},
		{
			"id": "ac03d44f-619a-50e2-bbbf-61ce2efce624",
			"name": "A5 Coupé"
		},
		{
			"id": "6b7d43d3-55b2-5a01-a582-a0236738a89c",
			"name": "A5 Sportback"
		},
		{
			"id": "47de1617-ea6b-5949-9b6c-5afad23c6784",
			"name": "A5 Cabrio"
		},
		{
			"id": "4344ae40-1cb3-576e-a471-f54db4ee4256",
			"name": "RS 5"
		},
		{
			"id": "d0a6b5c7-3206-5e34-9094-de36868395b9",
			"name": "Q5"
		},
		{
			"id": "ee45b49e-5cdc-55ea-8cb2-27ff0a3bf657",
			"name": "A6"
		},
		{
			"id": "174451c2-610e-5f6c-b045-471adaae0a2e",
			"name": "A6 Avant"
		},
		{
			"id": "b575a8b6-c850-5a0a-bdc3-3e5d0a8bdeb6",
			"name": "A7 Sportback"
		},
		{
			"id": "9295b12f-b879-5388-be57-84ec5fd1b88f",
			"name": "Q7"
		},
		{
			"id": "d2174096-7510-5676-bf60-bdbec57c400e",
			"name": "Q8"
		},
		{
			"id": "5cff58a8-6fc7-5baf-8e0f-a00dc5d3f8e1",
			"name": "A8"
		},
		{
			"id": "1132acd8-a93f-51c9-a226-0348dbbe8546",
			"name": "R8 Coupé"
		},
		{
			"id": "8499e4e0-482c-5d7f-a016-d877456a1b7a",
			"name": "e-tron"
		},
		{
			"id": "c795b1e7-dcf7-504f-9be0-5746c0e06cf7",
			"name": "Caddy Profesional"
		},
		{
			"id": "9cc735b5-159c-5cb4-a838-141be5dafc30",
			"name": "Caddy"
		},
		{
			"id": "854fcf8a-bde5-5432-aace-554865a11f51",
			"name": "Amarok"
		},
		{
			"id": "79b10177-58a6-5cdd-a1c5-51821a51c259",
			"name": "Transporter chasis"
		},
		{
			"id": "98ebb374-8768-5f75-8429-2d440a861adb",
			"name": "Transporter"
		},
		{
			"id": "ad887f34-7d17-565c-a12a-8ad0090983a0",
			"name": "Caravelle"
		},
		{
			"id": "7848e238-957b-536b-a129-0d890255a32c",
			"name": "Multivan"
		},
		{
			"id": "447127a9-4c16-54ed-a962-ab695f40c99a",
			"name": "California"
		},
		{
			"id": "47b19620-c260-5b12-9167-107d01d90a88",
			"name": "El nuevo e-Crafter"
		},
		{
			"id": "a0814bd2-0865-5cf0-9f0f-69e62ccd4ed2",
			"name": "Crafter"
		},
		{
			"id": "fa979df1-d4e0-5207-b3c0-98ef6d4ec9d7",
			"name": "Crafter Chasis"
		},
		{
			"id": "d90a45b0-b250-53e1-9196-6f7d5b467d6c",
			"name": "Crafter Box"
		},
		{
			"id": "79992575-5551-5af4-8b85-a7831172cd87",
			"name": "Crafter Fresh"
		},
		{
			"id": "cd5ab0c8-7fe2-5ef1-b074-8b8cd389ac09",
			"name": "Mii"
		},
		{
			"id": "2fb1bf52-c475-5488-b6af-b13c2ecc18fb",
			"name": "Ibiza"
		},
		{
			"id": "b338bffe-a0ea-5e11-9def-9c92e9df8141",
			"name": "Leon"
		},
		{
			"id": "93c23cc2-c2a0-59e6-b398-f4779fb75873",
			"name": "Toledo"
		},
		{
			"id": "952d6ae0-2a1b-58ba-a126-075da5c2b072",
			"name": "Arona"
		},
		{
			"id": "a48ee4c7-424f-5bdd-b413-2dae60877b7d",
			"name": "Ateca"
		},
		{
			"id": "9aa5a318-e1a8-5f6b-9b30-6301e8af44b7",
			"name": "Alhambra"
		},
		{
			"id": "5917b503-7b8f-504f-8938-523a56c62268",
			"name": "Tarraco"
		}
	],
	[{
			"id": "3f9e707c-c7b7-5673-9594-9ca9ba2937af",
			"name": "Polo"
		},
		{
			"id": "09c1612b-b3bc-5e36-bf94-f46e721b40c0",
			"name": "New T-Roc"
		},
		{
			"id": "56d8181d-cb95-54b2-aaf3-e8e3bcc6b310",
			"name": "Arteon"
		},
		{
			"id": "e2817b7c-d8dd-5195-a017-a35cd762398f",
			"name": "New Touareg"
		}
	],
	[{
			"id": "ea7a9476-242e-5d7c-9c63-138b581c1b68",
			"name": "up!"
		},
		{
			"id": "89431ac4-0656-5497-ad67-9186c3471435",
			"name": "Polo"
		},
		{
			"id": "6ef39d26-8104-5791-b80d-df6cb0193e6f",
			"name": "T-Cross"
		},
		{
			"id": "ea65aaad-5575-56b5-96da-3c280b4713e7",
			"name": "Golf"
		},
		{
			"id": "6681432c-3fa4-5392-9123-1e3f214d92e4",
			"name": "T-Roc"
		},
		{
			"id": "c769fe48-9b6d-50f1-9357-9996ab0d6e4e",
			"name": "Golf Sportsvan"
		},
		{
			"id": "73cdb041-d149-56f6-9fdb-39d08e4f7685",
			"name": "Golf Variant"
		},
		{
			"id": "5071c4f0-38d7-5e61-9cb7-0c49b1840600",
			"name": "Touran"
		},
		{
			"id": "ef69db05-6509-5318-b0ca-90fa84cfa4ed",
			"name": "Tiguan"
		},
		{
			"id": "0f183cd3-2088-5d1c-bbc1-8afd280cde8c",
			"name": "Tiguan Allspace"
		},
		{
			"id": "d391da2d-9f68-5fe3-b15c-22955ede8b25",
			"name": "Passat"
		},
		{
			"id": "21e03c54-1f5e-550e-9772-280bd238200b",
			"name": "Passat Variant"
		},
		{
			"id": "5ad8a23b-f695-53ac-854f-744eb104b796",
			"name": "Arteon"
		},
		{
			"id": "84c07498-568b-53a7-be14-e9f9385bb5e7",
			"name": "Sharan"
		},
		{
			"id": "7a8b3043-2680-53ec-a9da-469fc496efda",
			"name": "Touareg"
		},
		{
			"id": "82fe5913-650a-5f4a-935d-453ec55f2983",
			"name": "Citigo"
		},
		{
			"id": "a03765ff-48f0-52f5-b5b3-ae4353b975ac",
			"name": "Fabia"
		},
		{
			"id": "c6e1ba97-74d3-5b9f-9a26-08e2e8fdb961",
			"name": "Fabia Combi"
		},
		{
			"id": "b04b066e-4aef-5950-8415-654d113053b8",
			"name": "Rapid"
		},
		{
			"id": "e64f60a3-745e-5ba9-bcad-bc2463292184",
			"name": "Rapid Spaceback"
		},
		{
			"id": "f5125cd5-ce7d-567a-adbb-eef3c1867529",
			"name": "Karoq"
		},
		{
			"id": "65463cd7-8d22-5f89-969d-1c32df990ab1",
			"name": "Kodiaq"
		},
		{
			"id": "fd55b89f-cab6-5936-a41b-9a83ce1336f1",
			"name": "Octavia"
		},
		{
			"id": "859a8709-36fe-54c2-937d-b1e0a684772b",
			"name": "Octavia Combi"
		},
		{
			"id": "6b9f6087-3871-525d-9932-163cbfca72f7",
			"name": "Superb"
		},
		{
			"id": "c1fc4f4e-1984-5a27-8ad6-56b7cd7d83ef",
			"name": "Superb Combi"
		},
		{
			"id": "82f271ec-fe9a-5be6-ad91-a18298bd9d8c",
			"name": "Caddy Van"
		},
		{
			"id": "9240b2c9-e702-5d77-add9-2a21ff77195c",
			"name": "Amarok"
		},
		{
			"id": "ee420b24-659d-5cc4-addc-968c8b8aebf9",
			"name": "Transporter"
		},
		{
			"id": "e35736b6-298c-5003-9808-4d40f506b102",
			"name": "Den nye Crafter"
		}
	],
	[{
			"id": "ef7f7c23-2537-5067-9c0b-25f77433a1de",
			"name": "Der up!"
		},
		{
			"id": "8cd99132-b085-5188-88fb-b7e3a86a336f",
			"name": "Der Polo"
		},
		{
			"id": "146a91a8-954f-520e-bb56-22ebbcb8a6d3",
			"name": "Der neue T-Cross"
		},
		{
			"id": "54ae5960-4c6e-5a50-9f36-c88ab444db21",
			"name": "Der Golf"
		},
		{
			"id": "753de43a-4cb2-5bf4-b90c-c152bec3d1fb",
			"name": "Der T-Roc"
		},
		{
			"id": "2b12048f-4865-5e71-8f63-acb8c2c94233",
			"name": "Der Golf Sportsvan"
		},
		{
			"id": "84f59e2a-71e8-561a-911a-0134267586c1",
			"name": "Der Golf Variant"
		},
		{
			"id": "16ceb037-1966-57fc-9aea-257f6016b79d",
			"name": "Der Touran"
		},
		{
			"id": "c53988e7-24ea-5e3a-86ec-9bf34b63f979",
			"name": "Der Tiguan"
		},
		{
			"id": "62968338-4878-533f-ae35-14b9561a7ca7",
			"name": "Der neue Tiguan Allspace"
		},
		{
			"id": "a23c876e-a9c5-54fe-9b6b-7fd9ebb6fc50",
			"name": "Der Passat"
		},
		{
			"id": "6a2a128a-2a1f-56d6-962b-c0837105bf16",
			"name": "Der Passat Variant"
		},
		{
			"id": "2e883f7b-1139-56c9-a5fb-fd811ff7bead",
			"name": "Der Arteon"
		},
		{
			"id": "32fd525f-39df-5aa0-9507-3a93d0dab73b",
			"name": "Der Sharan"
		},
		{
			"id": "c0eb1c5f-ab3d-5627-ade5-ce5638a4b350",
			"name": "Der neue Touareg"
		},
		{
			"id": "7f226e25-10db-5c11-8b2e-2f0e1c377b9a",
			"name": "A1 Sportback"
		},
		{
			"id": "058ce52b-75d6-516e-8cec-e2247a0071f3",
			"name": "Q2"
		},
		{
			"id": "7144f2ae-a992-5d30-b61e-cccf0ebbae43",
			"name": "SQ2"
		},
		{
			"id": "185366f3-cf59-5889-a833-64142f1e987d",
			"name": "TT Coupé"
		},
		{
			"id": "fdda1851-09f5-5189-99a8-4656ff1bc02e",
			"name": "TT Roadster"
		},
		{
			"id": "f6e4e8fd-c9e4-523f-b5e1-54942eb65940",
			"name": "TTS"
		},
		{
			"id": "58bd5997-c17e-5453-a733-84997272c5c2",
			"name": "TT RS"
		},
		{
			"id": "a86796a2-09c6-51af-a070-41df34d03f71",
			"name": "A3 Sportback"
		},
		{
			"id": "eea4772a-8579-56a0-bcae-3e630cc2fe9c",
			"name": "A3 Sedan"
		},
		{
			"id": "0aada4fe-10b5-550a-8012-3667cf3b8122",
			"name": "A3 Cabriolet"
		},
		{
			"id": "845dacb5-a46e-5a59-a772-4ac6d65fbff2",
			"name": "S3"
		},
		{
			"id": "16874f75-1d06-50f4-9760-ed93275b39b8",
			"name": "RS 3"
		},
		{
			"id": "9e23fefc-ea07-50d7-9e1f-ae47a9caebe0",
			"name": "Q3"
		},
		{
			"id": "5cc0dd2e-c817-59e7-9272-5452da97d694",
			"name": "A4"
		},
		{
			"id": "e96829a8-c829-5fba-b85d-b7225b3d7f35",
			"name": "A4 Avant"
		},
		{
			"id": "c6e5fa61-ec6d-5f89-8859-13297d15b268",
			"name": "A4 allroad quattro"
		},
		{
			"id": "0ce46735-2335-5d5c-90e7-43cf0e5340d5",
			"name": "RS 4 Avant"
		},
		{
			"id": "6d6ff048-a851-5b35-b5ad-16196ab8f3ef",
			"name": "A5 Coupé"
		},
		{
			"id": "4ca17033-2823-5224-a49f-3427ce442e27",
			"name": "A5 Sportback"
		},
		{
			"id": "f4f55680-7e00-5e46-9178-ac68211a8f4e",
			"name": "A5 Cabriolet"
		},
		{
			"id": "cbdf709b-185c-5e5c-a4b0-3dbe94df7109",
			"name": "RS 5"
		},
		{
			"id": "1070732f-5195-5b2d-bbfd-1c42a9529e72",
			"name": "Q5"
		},
		{
			"id": "6928e1da-93f0-5246-b3a3-6b17e64b0378",
			"name": "SQ5"
		},
		{
			"id": "c5a3c728-f117-54fc-aba8-9b6e81f3029d",
			"name": "A6"
		},
		{
			"id": "2fb602e1-eda3-55be-aba9-84339d037f09",
			"name": "A6 Avant"
		},
		{
			"id": "39bb74a2-b4ce-5b4a-bbb7-15f8c40c71d6",
			"name": "A7 Sportback"
		},
		{
			"id": "42da7c17-1576-52a4-99cd-f494a8e2fba7",
			"name": "Q7"
		},
		{
			"id": "1ce70e46-91c3-5528-a7f7-4faf1ba79226",
			"name": "Q8"
		},
		{
			"id": "c53a5232-e367-5fd2-b9ce-978f9ed7cb2c",
			"name": "A8"
		},
		{
			"id": "36164252-b8df-540f-a800-c54be1c535e2",
			"name": "e-tron"
		},
		{
			"id": "2baf3cb6-50e0-582c-a240-f85f11378604",
			"name": "Der Crafter Kipper"
		},
		{
			"id": "15f83139-1fad-516c-b501-c6124e14609b",
			"name": "Der Caddy Kastenwagen"
		},
		{
			"id": "e240330c-ecb5-5c1c-a922-170f52ea3472",
			"name": "Der Caddy Kombi"
		},
		{
			"id": "81f5dd90-2e9e-51d0-b126-fea97d354db5",
			"name": "Der Caddy"
		},
		{
			"id": "52bedb09-1774-5628-a016-9836990e252b",
			"name": "Der Caddy Beach"
		},
		{
			"id": "127b6237-08ca-54d4-895f-0d23e654257b",
			"name": "Der Amarok"
		},
		{
			"id": "ea5d9ee6-669d-57d8-b56b-03b38f54abcc",
			"name": "Das Transporter Fahrgestell"
		},
		{
			"id": "3e05c41c-0498-5262-8252-e669a083b4d0",
			"name": "Der Transporter Pritschenwagen"
		},
		{
			"id": "0920d483-e607-571c-a820-eb55114b4e6b",
			"name": "Der Transporter Kastenwagen"
		},
		{
			"id": "ee045645-7aea-5cc5-b610-7041daab1b24",
			"name": "Der Transporter Kombi"
		},
		{
			"id": "e1cb7100-5579-52fd-9331-e2e23b4deda9",
			"name": "Der Caravelle"
		},
		{
			"id": "1e6c6757-4a15-5e01-98ad-ab5c001103b4",
			"name": "Der California"
		},
		{
			"id": "d4d6f4a4-de21-528a-b302-e1b7893a80ee",
			"name": "Der Multivan"
		},
		{
			"id": "a03167c5-23fa-5926-a4e6-5bc9ae020482",
			"name": "Das Crafter Fahrgestell"
		},
		{
			"id": "65dfdb62-2816-5191-bdc9-dbda3fab6147",
			"name": "Der Crafter Pritschenwagen"
		},
		{
			"id": "a24dbb91-ce09-5450-9372-57ef69d67719",
			"name": "Der Crafter Kastenwagen"
		},
		{
			"id": "44157146-8bfa-5dbd-afc8-c249fdbce839",
			"name": "Mii"
		},
		{
			"id": "b651e7e0-d480-5944-8138-2d0f3d94cd6c",
			"name": "Ibiza"
		},
		{
			"id": "895d3b59-0ccc-520d-96c2-ff99568ada3c",
			"name": "Leon"
		},
		{
			"id": "ff9bf59f-86ad-5840-83f1-ede65e52efd2",
			"name": "Toledo"
		},
		{
			"id": "c27611af-d9a0-5ab8-a314-175480160e56",
			"name": "Arona"
		},
		{
			"id": "1018c0e7-c72a-5527-b0a5-f44535d4f1b5",
			"name": "Ateca"
		},
		{
			"id": "f7d35f93-0da4-5555-8b77-e4179084d66a",
			"name": "Alhambra"
		},
		{
			"id": "dabbbefd-075b-5930-934a-4977964365b6",
			"name": "Tarraco"
		}
	],
	[{
			"id": "be8fb691-695f-51b8-9894-0fa3247234a8",
			"name": "Der Caddy Kastenwagen"
		},
		{
			"id": "70a56402-c2de-5683-80e5-4cb12cf70260",
			"name": "Der Caddy Kombi"
		},
		{
			"id": "fb2c0f95-6f9d-5f61-beaf-1dd81487ea77",
			"name": "Der Caddy"
		},
		{
			"id": "2f994f1f-05b8-5557-b16c-3777ff2c4c33",
			"name": "Der Caddy Beach"
		},
		{
			"id": "1e9ff227-e987-5bee-bf51-0c2e07f18224",
			"name": "Der Amarok"
		},
		{
			"id": "ab9b3253-f3c2-56f6-ae2d-28bd89d43f3e",
			"name": "Das Transporter Fahrgestell"
		},
		{
			"id": "d9c8db91-150b-5ef9-b897-60117d9a1112",
			"name": "Der Transporter Pritschenwagen"
		},
		{
			"id": "c14a981e-d0ec-5d2a-b9c9-245d22f86349",
			"name": "Der Transporter Kastenwagen"
		},
		{
			"id": "8f6a0509-ad3e-586d-a875-86d3c14652d5",
			"name": "Der Transporter Kombi"
		},
		{
			"id": "7615362a-b947-5be6-9abb-e523001ad10b",
			"name": "Der Caravelle"
		},
		{
			"id": "d5ee3db3-0228-534f-897f-7658dcac7753",
			"name": "Der California"
		},
		{
			"id": "dac2b632-99ff-5428-b7f6-f9b10901a627",
			"name": "Der Multivan"
		},
		{
			"id": "45d90297-e158-5d1d-ad77-b73962bee0fe",
			"name": "Der Crafter Kastenwagen"
		},
		{
			"id": "123bec33-bbdb-5edf-9979-75be0ffd3427",
			"name": "Das Crafter Fahrgestell"
		},
		{
			"id": "69b9bf36-dffb-5f0c-9056-fb48ddab0c94",
			"name": "Der Crafter Pritschenwagen"
		},
		{
			"id": "e0778c2c-0533-5112-af99-9c3246fe871e",
			"name": "Grand California"
		}
	],
	[{
			"id": "981cd432-4576-573b-bf11-1215cdc3cef1",
			"name": "up!"
		},
		{
			"id": "b24af433-5d32-5103-9411-9713160aaf50",
			"name": "Polo"
		},
		{
			"id": "2ab9e050-eb1c-5ee4-ab34-e044a5c8a586",
			"name": "New T-Cross"
		},
		{
			"id": "b8a988ae-f8f9-57b9-a392-cb59932bfb07",
			"name": "Golf"
		},
		{
			"id": "c04b4db9-a904-509a-a2b3-ef202e3da2a1",
			"name": "T-Roc"
		},
		{
			"id": "d19de542-4d97-5e6f-a577-e39df2846ada",
			"name": "Golf Sportsvan"
		},
		{
			"id": "5c64f273-a3dd-5336-abf9-16074c0a8524",
			"name": "Golf Variant"
		},
		{
			"id": "aa2cc048-f5d5-55d1-ab97-0ed48ecfac9d",
			"name": "Touran"
		},
		{
			"id": "53bffdf2-6bde-5c02-8a35-3b5eb0ae01c1",
			"name": "Tiguan"
		},
		{
			"id": "3299fd10-722b-5deb-a38b-ff133aab982e",
			"name": "Tiguan Allspace"
		},
		{
			"id": "0ac942e2-83ba-509e-9455-1f310521ebde",
			"name": "Passat"
		},
		{
			"id": "ecd0eb41-2ed2-5112-9a9b-ea5d0baf31cc",
			"name": "Passat Variant"
		},
		{
			"id": "0f07843c-1dc5-5c3c-9eae-707cffc32fa1",
			"name": "Arteon"
		},
		{
			"id": "55976bec-6e2a-5c5d-a10a-13c4706706ea",
			"name": "Sharan"
		},
		{
			"id": "73c5b940-d718-57b4-92d9-dca123639798",
			"name": "New Touareg"
		},
		{
			"id": "64d22916-a5ae-5950-9910-9b6b7c3c7946",
			"name": "A1 Sportback"
		},
		{
			"id": "d0fee0bd-38ea-5ae5-b534-88d08b035f6b",
			"name": "Q2"
		},
		{
			"id": "7c9923b3-8dcd-5818-a1b0-53b788ba43f7",
			"name": "S Q2"
		},
		{
			"id": "7a27a72d-8f6a-5ec5-b6ed-cdb96219e9a0",
			"name": "TT Coupé"
		},
		{
			"id": "c19dc403-b033-517d-9f9d-b5b6306fd981",
			"name": "TT Roadster"
		},
		{
			"id": "94a89284-a518-55fc-b40b-054d2a570c21",
			"name": "TT S"
		},
		{
			"id": "0bffd100-1942-5be6-9e4b-106cc9f477f8",
			"name": "TT RS"
		},
		{
			"id": "ea13b1d7-e6c4-5d37-895d-c5c7f3795849",
			"name": "A3 Sportback"
		},
		{
			"id": "0e205cea-3cea-5d47-baf9-5e35331f92a4",
			"name": "A3 Berline"
		},
		{
			"id": "5dafab1d-30a6-5742-80e3-7cf793355a1f",
			"name": "A3 Cabriolet"
		},
		{
			"id": "b50f8f1a-94f7-5c2e-8a45-35d4620dfaf8",
			"name": "S3"
		},
		{
			"id": "5cc63915-9cba-50f5-b43c-73c71e9dcfa2",
			"name": "RS 3"
		},
		{
			"id": "7f8af196-5d4c-51fb-9fe0-d22886cd2dbf",
			"name": "Q3"
		},
		{
			"id": "0ef66f49-605d-562a-96fc-6cc94dbd5f3d",
			"name": "A4 Berline"
		},
		{
			"id": "5bab0539-742e-5041-b15c-58a1f74f47ef",
			"name": "A4 Avant"
		},
		{
			"id": "1663d704-9e00-5e03-a4da-5e60b38853cc",
			"name": "A4 allroad quattro"
		},
		{
			"id": "cff7ffb5-7630-51a7-8326-922d85cd6887",
			"name": "RS 4 Avant"
		},
		{
			"id": "c3ad7f93-3d47-5825-8d90-1e2c7ec35750",
			"name": "A5 Coupé"
		},
		{
			"id": "40ecb82c-bdb2-5b13-9072-c8b994195622",
			"name": "A5 Sportback"
		},
		{
			"id": "bf20a458-b7c7-5e15-97fb-a2ab9ba7525e",
			"name": "A5 Cabriolet"
		},
		{
			"id": "ca7b0038-8568-5bb6-82e7-af2e51b8897b",
			"name": "RS 5"
		},
		{
			"id": "169191b8-fd0e-50a0-a650-fa03791d0cfc",
			"name": "Q5"
		},
		{
			"id": "6b844ea2-1c79-5e67-8dcf-802bb3b184fd",
			"name": "A6 Berline"
		},
		{
			"id": "90d0dfa0-f806-51be-9721-b848e0cd11e1",
			"name": "A6 Avant"
		},
		{
			"id": "e25ffc37-5af3-5bf0-a30d-bcc1e305318a",
			"name": "A7 Sportback"
		},
		{
			"id": "20ee01c2-17ad-5140-a4f8-f958eca49e9a",
			"name": "Q7"
		},
		{
			"id": "a91f2421-af67-5bc1-9894-c387767389e4",
			"name": "Q8"
		},
		{
			"id": "92d71f4f-65e2-58b3-abee-00b98cd55cb4",
			"name": "Audi A8"
		},
		{
			"id": "486b06ca-a6e8-5e34-8d11-873276f726b5",
			"name": "e-tron"
		},
		{
			"id": "51c21d18-3914-5a4b-9b6f-ed0b4b2e7f6c",
			"name": "CITIGO"
		},
		{
			"id": "e1eb3e9f-f412-5f83-986f-5ed5850c2835",
			"name": "FABIA"
		},
		{
			"id": "9dd3381a-87e7-5bea-839f-69554e2f0892",
			"name": "FABIA COMBI"
		},
		{
			"id": "4776fc05-616a-571c-bcb7-c232bb871f6d",
			"name": "SCALA"
		},
		{
			"id": "b0ac1a4f-1b2e-5b25-affa-1bfcaa7d85c5",
			"name": "KAROQ"
		},
		{
			"id": "08f0af9b-0ee7-5369-86c9-7953da992566",
			"name": "KODIAQ"
		},
		{
			"id": "9dba8b15-04a2-595c-9c4f-f4f3e61f9af4",
			"name": "OCTAVIA"
		},
		{
			"id": "da42480d-7363-57ec-9153-f380eab9113e",
			"name": "OCTAVIA COMBI"
		},
		{
			"id": "c4cd95e2-3a3b-5571-9d57-3e69b0c3018a",
			"name": "SUPERB"
		},
		{
			"id": "eb54afce-f1b3-562b-8414-28618ee9b175",
			"name": "SUPERB COMBI"
		},
		{
			"id": "efcc7d52-7db2-57c1-a04d-ee2c33d3c123",
			"name": "Caddy Van & Maxi Van"
		},
		{
			"id": "927de7bd-384d-5667-8c0a-ab62731de4ea",
			"name": "Caddy & Caddy Maxi"
		},
		{
			"id": "d564b9b1-3ddf-5fdd-94d8-d40869b93547",
			"name": "Amarok"
		},
		{
			"id": "4cad49c5-1640-59c0-b8b6-0a602079a4cb",
			"name": "Transporter Pick-Up"
		},
		{
			"id": "3e141ef5-1a38-5dc4-8f9e-a4ccf98f03c5",
			"name": "Transporter Bestelwagen"
		},
		{
			"id": "b7751492-bb4d-5624-85c5-747199bc259c",
			"name": "Transporter Combi"
		},
		{
			"id": "195da836-515e-56c1-941b-7e3bd2e7f278",
			"name": "Crafter Chassis"
		},
		{
			"id": "abc9766e-4b30-5ea0-803a-62610a7eebf5",
			"name": "Crafter Pick-up"
		},
		{
			"id": "0d369a73-3d55-50cf-9ec2-2c5d0d09b5d0",
			"name": "Crafter Bestelwagen"
		},
		{
			"id": "72c52c64-d29f-5a82-8017-d65a301d58a7",
			"name": "Caravelle"
		},
		{
			"id": "ffe7a6b4-801b-5924-b81a-c33a4c254437",
			"name": "Multivan"
		},
		{
			"id": "c4ffe77e-a704-5c13-a964-1f8057f71246",
			"name": "California"
		},
		{
			"id": "00761680-42fc-5bc3-9b05-ef1a1cbfff28",
			"name": "e-Crafter"
		},
		{
			"id": "039db0f1-c447-54d8-9f45-390824fbf466",
			"name": "Mii"
		},
		{
			"id": "3f1061af-2e7e-55a4-80e8-33cc702fae8a",
			"name": "Ibiza"
		},
		{
			"id": "0d7e1ff4-d087-5dfc-9710-4875958576aa",
			"name": "Leon"
		},
		{
			"id": "0df6993b-c0e5-540a-acee-214ec0c1d35a",
			"name": "Toledo"
		},
		{
			"id": "c9df40cf-784d-5c9f-8115-4c6b263cd9ab",
			"name": "Arona"
		},
		{
			"id": "77b731a9-49ae-5445-b1b7-2a8ce11abe90",
			"name": "Ateca"
		},
		{
			"id": "380a7c25-003c-565e-8ea9-9bd57e12995f",
			"name": "Alhambra"
		},
		{
			"id": "22ea116d-392c-57e4-b7bc-d68639332135",
			"name": "Tarraco"
		}
	]
]

let flatModels = []

allModels.map(arrayOfModels => {
	arrayOfModels.map(model => {
		flatModels.push(model)
	})
})

const uniqueModels = _.uniqBy(flatModels, model => model.name)
fs.writeFileSync('uniqueModels.json', JSON.stringify(uniqueModels))