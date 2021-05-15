using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace ApplicationProcess.December2020.Domain.Models
{
    public class Applicant
    {
        // ID(int )
        // Name(string )
        // FamilyName(string )
        // Address(string )
        // CountryOfOrigin(string )
        // EMailAdress(string )
        // Age(int)
        // Hired(bool) – false if not provided.

        public int ID { get; set; }


        [Required]
        [MinLength(5)]
        public string Name { get; set; }


        [Required]
        [MinLength(5)]
        public string FamilyName { get; set; }

        [Required]
        [MinLength(10)]
        public string Address { get; set; }

        [Required]
        public string CountryOfOrigin { get; set; }

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }

        [Required]
        [Range(20, 60, 
        ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        public int Age { get; set; }

        [DefaultValue(false)]
        public bool Hired { get; set; }

    } 
}