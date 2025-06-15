using System;
using System.Text;

namespace Team_Project_Meta.Services.DeliveryServices
{
    public class DeliveryServicesService
    {
        private static readonly Random _random = new Random();

        // Generates a string of 10 random alphanumeric characters
        private string GenerateRandomSymbols(int length = 10)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var result = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                result.Append(chars[_random.Next(chars.Length)]);
            }
            return result.ToString();
        }

        public string GetDeliveryServiceCode(int? deliveryServiceId)
        {
            if (deliveryServiceId == null)
                throw new ArgumentNullException(nameof(deliveryServiceId), "Delivery service ID cannot be null.");

            string prefix = deliveryServiceId switch
            {
                1 => "DS1",
                2 => "DS2",
                3 => "DS3",
                _ => throw new ArgumentException("Invalid delivery service ID")
            };

            return prefix + GenerateRandomSymbols();
        }
    }
}
