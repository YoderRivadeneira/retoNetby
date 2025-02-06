using Domain.Entities;
using System.Collections.Generic;

namespace Presentation.DTOs
{
    public class FormDto
    {
        public required string Name { get; set; }
        public required List<InputField> Inputs { get; set; }
    }
}
