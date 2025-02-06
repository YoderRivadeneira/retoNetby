using Domain.Entities;
using Infrastructure.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Services
{
    public class FormService
    {
        private readonly FormRepository _formRepository;

        public FormService(FormRepository formRepository)
        {
            _formRepository = formRepository;
        }

public async Task<List<Form>> GetAllFormsAsync()
{
    var forms = await _formRepository.GetAllFormsAsync();

    forms.ForEach(f => f.Inputs.ForEach(i => i.Id = i.Id.ToString()));

    return forms;
}



        public async Task<Form> GetFormByIdAsync(string id) => await _formRepository.GetFormByIdAsync(id);
        public async Task CreateFormAsync(Form form, bool isPerson) => await _formRepository.CreateOrUpdateFormAsync(form, isPerson);
        public async Task UpdateFormAsync(string id, Form form, bool isPerson) => await _formRepository.UpdateFormAsync(id, form, isPerson);
        public async Task DeleteFormAsync(string id, bool isPerson) => await _formRepository.DeleteFormAsync(id, isPerson);
    }
}
