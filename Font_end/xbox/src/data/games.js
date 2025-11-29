// data/games.js

export async function fetchGames() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          game_name: "Grand Theft Auto V (GTA V)",
          company_name: "Rockstar Games",
          game_type: "Action",
          icon:
            "https://upload.wikimedia.org/wikipedia/th/thumb/c/cc/Grand_Theft_Auto_V_Cover.png/250px-Grand_Theft_Auto_V_Cover.png",
          installed: true,
          owned: true,
          inGamePass: false,
          updated: "today",
        },
        {
          id: 2,
          game_name: "Minecraft",
          company_name: "Mojang Studios (Microsoft)",
          game_type: "Sandbox",
          icon:
            "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png",
          installed: true,
          owned: false,
          inGamePass: true,
          updated: "yesterday",
        },
        {
          id: 3,
          game_name: "Fortnite",
          company_name: "Epic Games",
          game_type: "Battle Royale",
          icon:
            "https://cdn2.unrealengine.com/fneco-2025-keyart-thumb-1920x1080-de84aedabf4d.jpg",
          installed: false,
          owned: false,
          inGamePass: true,
          updated: "2 days ago",
        },
        {
          id: 4,
          game_name: "League of Legends (LoL)",
          company_name: "Riot Games",
          game_type: "MOBA",
          icon:
            "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-47eb328eac5ddd63ebd096ded7d0d5ab",
          installed: true,
          owned: true,
          inGamePass: false,
          updated: "yesterday",
        },
        {
          id: 5,
          game_name: "Call of Duty: Modern Warfare II / Warzone",
          company_name: "Infinity Ward / Activision",
          game_type: "Shooter",
          icon:
            "https://xboxwire.thesourcemediaassets.com/sites/2/2022/11/PC_WZ_S01_KA_16x9_WEAPONS_101022_BRANDED-2a3c61782ce3e1efd5ed.jpg",
          installed: false,
          owned: true,
          inGamePass: false,
          updated: "3 days ago",
        },
        {
          id: 6,
          game_name: "The Legend of Zelda: Breath of the Wild",
          company_name: "Nintendo",
          game_type: "Adventure",
          icon:
            "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/250px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
          installed: true,
          owned: true,
          inGamePass: false,
          updated: "last week",
        },
        {
          id: 7,
          game_name: "God of War (2018)",
          company_name: "Santa Monica Studio (Sony Interactive Entertainment)",
          game_type: "Action",
          icon:
            "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg",
          installed: false,
          owned: false,
          inGamePass: false,
          updated: "last month",
        },
        {
          id: 8,
          game_name: "Cyberpunk 2077",
          company_name: "CD Projekt Red",
          game_type: "RPG",
          icon:
            "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
          installed: true,
          owned: false,
          inGamePass: true,
          updated: "yesterday",
        },
        {
          id: 9,
          game_name: "Elden Ring",
          company_name: "FromSoftware (Bandai Namco)",
          game_type: "RPG",
          icon:
            "https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/UAnLUUMdxA9cow8TEe8IfhuC.png",
          installed: false,
          owned: true,
          inGamePass: false,
          updated: "2 days ago",
        },
        {
          id: 10,
          game_name: "PUBG: Battlegrounds",
          company_name: "PUBG Studios (Krafton)",
          game_type: "Battle Royale",
          icon:
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
