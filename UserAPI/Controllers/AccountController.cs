using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Net.Mail;
using System.Web;
using UserAPI.DTOs;
using UserAPI.Entities;
using UserAPI.Services;

namespace UserAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, TokenService tokenService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new AppUser { UserName = registerDto.Name, Email = registerDto.Email };

            IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result);

            await _userManager.AddToRoleAsync(user, "member");

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Name);

            if (user == null)
                user = await _userManager.FindByEmailAsync(loginDto.Name);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);


            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
            };
        }

        [Authorize]
        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }




        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = HttpUtility.UrlEncode(token);
            var resetUrl = $"/pages/resetpassword/resetpassword3?userId={user.Id}&token={encodedToken}";
            //var resetUrl = $"{forgotPasswordDto.BaseUrl}/pages/resetpassword/resetpassword3?userId={user.Id}&token={encodedToken}";

            //var body = $"Click <a href=\"{resetUrl}\">here</a> to reset your password.";

            //var message = new MailMessage
            //{
            //    From = new MailAddress("your-email-address@example.com"),
            //    Subject = "Password reset",
            //    Body = body,
            //    IsBodyHtml = true
            //};
            //message.To.Add(forgotPasswordDto.Email);

            //using (var smtp = new SmtpClient())
            //{
            //    await smtp.SendMailAsync(message);
            //}

            return Ok(resetUrl);
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByIdAsync(resetPasswordDto.UserId);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var decodedToken = HttpUtility.UrlDecode(resetPasswordDto.Token);
            
            var result = await _userManager.ResetPasswordAsync(user, decodedToken, resetPasswordDto.NewPassword);
            if (!result.Succeeded)
            {
                result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.NewPassword);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
            }

            return Ok();
        }

        //[Authorize(Roles ="admin")]
        [HttpPost("createrole")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);

            if (role != null)
                return BadRequest("Role already exists");

            var result = await _roleManager.CreateAsync(new AppRole { Name = roleName });

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }

            return StatusCode(201);
        }
        //[Authorize(Roles ="admin")]
        [HttpDelete("deleterole/{roleName}")]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return NotFound();
            }
            var result = await _roleManager.DeleteAsync(role);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            return StatusCode(201);
        }
        //[Authorize(Roles ="admin")]
        [HttpPut("updaterole/{roleName}")]
        public async Task<IActionResult> UpdateRole(string roleName, string updatedName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            if (role == null)
            {
                return NotFound();
            }
            role.Name = updatedName;
            var result = await _roleManager.UpdateAsync(role);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            return StatusCode(201);
        }
        //[Authorize(Roles ="admin")]
        [HttpGet("getAllRoles")]
        public IActionResult GetAllRoles()
        {
            var roles = _roleManager.Roles.Select(r => r.Name).ToList();
            return Ok(roles);

        }
        //[Authorize(Roles ="admin")]
        [HttpGet("getRoleWithUsers/{roleName}")]
        public async Task<IActionResult> GetRoleWithUsers(string roleName)
        {
            var users = await _userManager.GetUsersInRoleAsync(roleName);
            return Ok(users);

        }
        //[Authorize(Roles ="admin")]
        [HttpPost("edit-roles/{username}")]
        public async Task<IActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }
        //[Authorize(Roles ="admin")]
        [HttpPost("add-role-user/{username}")]
        public async Task<IActionResult> AddRoleToUser(string username, [FromQuery] string role)
        {

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");


            var result = await _userManager.AddToRoleAsync(user, role);

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }
        //[Authorize(Roles ="admin")]
        [HttpPost("remove-role-user/{username}")]
        public async Task<IActionResult> RemoveRoleFromUser(string username, [FromQuery] string role)
        {

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");


            var result = await _userManager.RemoveFromRoleAsync(user, role);

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }
        //[Authorize(Roles = "admin")]
        [HttpGet("roles-with-users")]
        public async Task<IActionResult> GetRolesWithUsers()
        {
            var roles = await _roleManager.Roles.ToListAsync();
            var rolesWithUsers = new List<object>();

            foreach (var role in roles)
            {
                var users = await _userManager.GetUsersInRoleAsync(role.Name);
                rolesWithUsers.Add(new { role = role.Name, users = users.Select(s => s.UserName).ToList() });
            }

            return Ok(rolesWithUsers);
        }
        //[Authorize(Roles = "admin")]
        [HttpGet("users-with-roles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
                .Include(r => r.AppUserRoles)
                .ThenInclude(r => r.AppRole)
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.AppUserRoles.Select(r => r.AppRole.Name).ToList()
                })
                .ToListAsync();

            return Ok(users);
        }
        //[Authorize(Roles = "admin")]
        [HttpGet("getUserById/{id}")]
        public async Task<IActionResult> GetUserByIdWithRoles(Guid id)
        {
            var users = await _userManager.Users
                .Include(r => r.AppUserRoles)
                .ThenInclude(r => r.AppRole)
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.AppUserRoles.Select(r => r.AppRole.Name).ToList()
                })
                .FirstOrDefaultAsync(u => u.Id == id);

            return Ok(users);
        }
        [Authorize(Roles ="admin")]
        [HttpGet("getAllUser")]
        public async Task<IActionResult> GetUsersAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            return Ok(users);
        }


    }
}
