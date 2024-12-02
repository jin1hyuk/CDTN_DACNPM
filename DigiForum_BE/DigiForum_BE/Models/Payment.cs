using System;

namespace DigiForum_BE.Models
{
    public class Payment
    {
        public Guid Id { get; set; }

        public Guid PartnerRegistrationId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentStatus { get; set; }

        public PartnerRegistration PartnerRegistration { get; set; }
    }
}

