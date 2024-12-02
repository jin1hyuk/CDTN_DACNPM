using System;

namespace DigiForum_BE.Models
{
    public class AdminApproval
    {
        public Guid Id { get; set; }

        public Guid PartnerRegistrationId { get; set; }
        public bool IsApproved { get; set; }
        public DateTime ApprovalDate { get; set; }
        public string AdminComments { get; set; }

        public PartnerRegistration PartnerRegistration { get; set; }
    }
}
