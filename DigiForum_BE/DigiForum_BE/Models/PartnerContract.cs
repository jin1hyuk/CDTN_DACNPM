using System;

namespace DigiForum_BE.Models
{
    public class PartnerContract
    {
        public Guid Id { get; set; }

        public Guid PartnerRegistrationId { get; set; }
        public string ContractDetails { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }

        public PartnerRegistration PartnerRegistration { get; set; }
    }
}
