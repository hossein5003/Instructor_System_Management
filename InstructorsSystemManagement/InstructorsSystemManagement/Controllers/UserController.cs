using InstructorsSystemManagement.DataAccess.Repository.IRepository;
using InstructorsSystemManagement.Extentiions;
using InstructorsSystemManagement.Services;
using Microsoft.AspNetCore.Mvc;
using static InstructorsSystemManagement.Dtos;

namespace InstructorsSystemManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public UserController(IUserRepository userRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult Register(UserDto userDto)
        {
            var user = userDto.AsUser();

            _userRepository.Add(user);

            return Created("success", user);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            var user=_userRepository.GetByName(loginDto.Name);

            if(user == null || !BCrypt.Net.BCrypt.Verify(loginDto.password,user.Password))
                return BadRequest(new {massage="Invalid Credentials"});

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt",jwt, new CookieOptions { HttpOnly = true });
            
            return Ok(new { massage="success" });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                Guid userId = Guid.Parse(token.Issuer);
                var user = _userRepository.Get(userId);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new {
                massage = "success"
            });
        }
    }
}
