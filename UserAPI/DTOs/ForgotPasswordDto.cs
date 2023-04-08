namespace UserAPI.DTOs
{
    public class ForgotPasswordDto
    {
        public string Email { get; set; }
        public string BaseUrl => "http://localhost:3000/Account";
    }
}
