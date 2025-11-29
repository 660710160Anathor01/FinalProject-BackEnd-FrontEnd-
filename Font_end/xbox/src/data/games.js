// data/games.js

export async function fetchGames() {
     return new Promise((resolve) => {
       setTimeout(() => {
         resolve([
           {
             id: 1,
             title: "Grand Theft Auto V (GTA V)",
             developer: "Rockstar Games",
             category: "Action",
             image:
               "https://upload.wikimedia.org/wikipedia/th/thumb/c/cc/Grand_Theft_Auto_V_Cover.png/250px-Grand_Theft_Auto_V_Cover.png",
             installed: true,
             owned: true,
             inGamePass: false,
             updated: "today",
           },
           {
             id: 2,
             title: "Minecraft",
             developer: "Mojang Studios (Microsoft)",
             category: "Sandbox",
             image:
               "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
             installed: true,
             owned: false,
             inGamePass: true,
             updated: "yesterday",
           },
           {
             id: 3,
             title: "Fortnite",
             developer: "Epic Games",
             category: "Battle Royale",
             image:
               "https://cdn2.unrealengine.com/fneco-2025-keyart-thumb-1920x1080-de84aedabf4d.jpg",
             installed: false,
             owned: false,
             inGamePass: true,
             updated: "2 days ago",
           },
           {
             id: 4,
             title: "League of Legends (LoL)",
             developer: "Riot Games",
             category: "MOBA",
             image:
               "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-47eb328eac5ddd63ebd096ded7d0d5ab",
             installed: true,
             owned: true,
             inGamePass: false,
             updated: "yesterday",
           },
           {
             id: 5,
             title: "Call of Duty: Modern Warfare II / Warzone",
             developer: "Infinity Ward / Activision",
             category: "Shooter",
             image:
               "https://xboxwire.thesourcemediaassets.com/sites/2/2022/11/PC_WZ_S01_KA_16x9_WEAPONS_101022_BRANDED-2a3c61782ce3e1efd5ed.jpg",
             installed: false,
             owned: true,
             inGamePass: false,
             updated: "3 days ago",
           },
           {
             id: 6,
             title: "The Legend of Zelda: Breath of the Wild",
             developer: "Nintendo",
             category: "Adventure",
             image:
               "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/250px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
             installed: true,
             owned: true,
             inGamePass: false,
             updated: "last week",
           },
           {
             id: 7,
             title: "God of War (2018)",
             developer: "Santa Monica Studio (Sony Interactive Entertainment)",
             category: "Action",
             image:
               "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg",
             installed: false,
             owned: false,
             inGamePass: false,
             updated: "last month",
           },
           {
             id: 8,
             title: "Cyberpunk 2077",
             developer: "CD Projekt Red",
             category: "RPG",
             image:
               "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
             installed: true,
             owned: false,
             inGamePass: true,
             updated: "yesterday",
           },
           {
             id: 9,
             title: "Elden Ring",
             developer: "FromSoftware (Bandai Namco)",
             category: "RPG",
             image:
               "https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/UAnLUUMdxA9cow8TEe8IfhuC.png",
             installed: false,
             owned: true,
             inGamePass: false,
             updated: "2 days ago",
           },
           {
             id: 10,
             title: "PUBG: Battlegrounds",
             developer: "PUBG Studios (Krafton)",
             category: "Battle Royale",
             image:
               "https://cdn1.epicgames.com/spt-assets/53ec4985296b4facbe3a8d8d019afba9/pubg-battlegrounds-19vwb.jpg",
             installed: true,
             owned: false,
             inGamePass: false,
             updated: "today",
           },
         ]);
       }, 300);
     });
   }
   