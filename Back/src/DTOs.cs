namespace back.src;

public class DTO_PlayerStats_Return
{
    
    public string? Clicks { get; set; }
    public string? Money { get; set; }
    public string? Autoclick_lvl { get; set; }
    public string? Multiplier_lvl { get; set; }

    public DTO_PlayerStats_Return(string? newClicks, string? newMoney, string?
    newAutoclick_lvl, string? newMultiplier_lvl)
    {

        Clicks = newClicks;
        Money = newMoney;
        Autoclick_lvl = newAutoclick_lvl;
        Multiplier_lvl = newMultiplier_lvl;

    }

}