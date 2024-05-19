namespace dctrestapi.Models;

public class Content {
    public long Id { get; set; }
    public string? contentFrom { get; set;}
    public string? contentTo { get; set;}
    public string? contentDesc { get; set;}
    public string? contentAudio { get; set;}
    public DateTime createdAt { get; set; }
    public DateTime updatedAt { get; set; }
}
public class FileUploadModel
{
    public IFormFile? File { get; set; }
}

public class Admin{
    public long Id { get; set;}
    public string? userName { get; set; }
    public string? userPass { get; set; }
    public DateTime createdAt { get; set; }
    public DateTime updatedAt { get; set; }    
}