namespace Team_Project_Meta.Models
{
    public class TaskItem
    {
        public int Id { get; set; } // ← обязательно должно быть!
        public string Title { get; set; }
        public bool IsCompleted { get; set; }
    }
}
