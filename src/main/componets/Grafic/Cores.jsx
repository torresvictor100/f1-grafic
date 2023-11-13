
export default class Cores{

      static getCorEquipe(equipe) {

        const coresEquipesF1: Record<string, string> = {
            "red_bull": "#011425",
            "mercedes": "#00d2be",
            "alphatauri": "#fcd800",
            "alfa": "#017747",
            "alpine": "#006bb8",
            "aston_martin": "#006560",
            "ferrari": "#a60203",
            "haas": "#ed1a3b",
            "mclaren": "#ff8000",
            "williams": "#00a1df"
          };

        const cor = coresEquipesF1[equipe.toLowerCase()];
        return cor || "#000"; 
      }
    
} 

