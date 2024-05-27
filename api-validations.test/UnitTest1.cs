using System;
using System.Net.Http;
using System.Threading.Tasks;
namespace api_validations.test;
public class Tests
{
    private static readonly HttpClient client = new HttpClient();


    // Positive case test for admins
    [Test]
    public async Task AdminsGet()
    {
        try
        {
            HttpResponseMessage response = await client.GetAsync("https://api.example.com/data");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
        }
        catch(HttpRequestException){}
    }
    public async Task AdminsGet()
    {
        try
        {
            HttpResponseMessage response = await client.GetAsync("https://api.example.com/data");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
        }
        catch(HttpRequestException){}
    }
}