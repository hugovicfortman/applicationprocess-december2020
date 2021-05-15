using FluentValidation;
using ApplicationProcess.December2020.Domain.Models;
using ApplicationProcess.December2020.Infrastructure.Helper;

namespace ApplicationProcess.December2020.Domain.Logic.Validator
{
	public class ApplicantValidator : AbstractValidator<Applicant>
	{
		public ApplicantValidator(CountryHelper c)
		{
			RuleFor(x => x.ID).NotNull();
			RuleFor(x => x.Name).Length(5,20);
			RuleFor(x => x.FamilyName).Length(5, 20);
			RuleFor(x => x.Age).InclusiveBetween(20, 60);
			RuleFor(x => x.Address).Length(10, 200);
			RuleFor(x => x.EmailAddress).EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible);
			RuleFor(x => x.Hired).NotNull();
			RuleFor(x => x.CountryOfOrigin).MustAsync(c.BeValidCountry);
		}

	}
}
