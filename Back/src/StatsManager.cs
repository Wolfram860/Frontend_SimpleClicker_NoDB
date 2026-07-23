using System.Runtime.InteropServices;

namespace back.src;

public class Stats
{

    private string statsFilePath = Path.Combine(Directory.GetCurrentDirectory(), "stats.txt");
    public string StatsFilePath
    {

        get { return statsFilePath; }

    }

    public int Clicks { get; set; } = 0;
    public int Money { get; set; } = 0;
    public int Multiplier_lvl { get; set; } = 0;
    public int Autoclick_lvl { get; set; } = 0;

    //

    public void CreateFile()
    {

        if (!Path.Exists(statsFilePath))
        {

            File.Create(statsFilePath);

            using (StreamWriter sw = new StreamWriter(StatsFilePath))
            {

                sw.WriteLine("Clicks-0");
                sw.WriteLine("Money-0");
                sw.WriteLine("Autoclick_lvl-0");
                sw.WriteLine("Multiplier_lvl-0");

            }

        }
        else
        {

            string[] stats = File.ReadAllLines(statsFilePath);

            foreach (string line in stats)
            {

                string[] splitedLine = line.Split('-');
                if (splitedLine[0] == "Clicks")
                {

                    Clicks = Convert.ToInt32(splitedLine[1]);

                }
                if (splitedLine[0] == "Money")
                {

                    Money = Convert.ToInt32(splitedLine[1]);

                }
                if (splitedLine[0] == "Autoclick_lvl")
                {

                    Autoclick_lvl = Convert.ToInt32(splitedLine[1]);

                }
                if (splitedLine[0] == "Multiplier_lvl")
                {

                    Multiplier_lvl = Convert.ToInt32(splitedLine[1]);

                }

            }

        }

    }

    public void AddScore()
    {

        Clicks++;
        Money += 1 * (Multiplier_lvl + 1);

        string[] stats = File.ReadAllLines(statsFilePath);
        string[] Clicks_Stat = stats[0].Split('-');
        string[] Money_Stat = stats[1].Split('-');

        Clicks_Stat[1] = Convert.ToString(Clicks);
        Money_Stat[1] = Convert.ToString(Money);

        stats[0] = string.Join('-', Clicks_Stat);
        stats[1] = string.Join('-', Money_Stat);

        File.WriteAllLines(statsFilePath, stats);

    }

    public void AutoclickUpgrade()
    {

        if (Autoclick_lvl <= 3)
        {

            return;

        }

        Autoclick_lvl++;
        string[] stats = File.ReadAllLines(statsFilePath);
        string[] autoclicker_stat = stats[2].Split('-');

        autoclicker_stat[1] = Convert.ToString(Autoclick_lvl);

        stats[2] = string.Join('-', autoclicker_stat);
        File.WriteAllLines(statsFilePath, stats);

    }

    public void MultiplierUpgrade()
    {

        if (Multiplier_lvl <= 3)
        {

            return;

        }

        Multiplier_lvl++;
        string[] stats = File.ReadAllLines(statsFilePath);
        string[] multiplier_Stat = stats[3].Split('-');

        multiplier_Stat[1] = Convert.ToString(Multiplier_lvl);

        stats[3] = string.Join('-', multiplier_Stat);
        File.WriteAllLines(statsFilePath, stats);

    }

    //
    
}