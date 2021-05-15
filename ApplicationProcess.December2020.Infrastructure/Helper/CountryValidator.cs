using System;
using System.Collections.Generic;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using System.Threading;

namespace ApplicationProcess.December2020.Infrastructure.Helper
{
    public class CountryHelper
    {
        private HttpClient _htc;

        public CountryHelper(HttpClient htc)
        {
            _htc = htc;
        }

        public async Task<bool> BeValidCountry(string countryName, CancellationToken tk)
        {
            try
            {
                // Since we will not use the country information, just the status, there is no need to Parse...
                HttpResponseMessage country = await _htc.GetAsync($"https://restcountries.eu/rest/v2/name/{ countryName.Trim().ToLower() }?fullText=true");
                country.EnsureSuccessStatusCode();
                string responseBody = await country.Content.ReadAsStringAsync();
                // Above three lines can be replaced with new helper method below
                // string responseBody = await client.GetStringAsync(uri);

                Console.WriteLine(responseBody);
                return true;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                return false;
            }
        }
    }
}
