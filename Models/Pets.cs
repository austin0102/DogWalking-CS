namespace DogWalkingCS.Models;
public class Pet
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int WalkerId { get; set; }
    public Walker Walker {get; set; }
}