using Microsoft.AspNetCore.Mvc;
using Application.Services;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/forms")]
    [ApiController]
    public class FormController : ControllerBase
    {
        private readonly FormService _formService;

        public FormController(FormService formService)
        {
            _formService = formService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Form>>> GetAllForms()
        {
            return Ok(await _formService.GetAllFormsAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Form>> GetFormById(string id)
        {
            var form = await _formService.GetFormByIdAsync(id);
            if (form == null) return NotFound();
            return Ok(form);
        }
        [HttpPost("{type}")]
        public async Task<IActionResult> CreateForm([FromBody] Form form, string type)
        {
            bool isPerson = type.ToLower() == "personas";
            await _formService.CreateFormAsync(form, isPerson);

            return Created($"api/forms/{type}/{form.Id}", form);
        }


        [HttpPut("{type}/{id}")]
        public async Task<IActionResult> UpdateForm(string id, [FromBody] Form form, string type)
        {
            bool isPerson = type.ToLower() == "personas";
            await _formService.UpdateFormAsync(id, form, isPerson);
            return NoContent();
        }

        [HttpDelete("{type}/{id}")]
        public async Task<IActionResult> DeleteForm(string id, string type)
        {
            bool isPerson = type.ToLower() == "personas";
            await _formService.DeleteFormAsync(id, isPerson);
            return NoContent();
        }
    }
}
