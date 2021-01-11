using System;
using System.Collections.Generic;
using System.Text;

namespace Hahn.ApplicationProcess.December2020.Infrastructure.Helper
{
    [AttributeUsage(AttributeTargets.Property)]
    public class MatchParentAttribute : Attribute
    {
        public readonly string ParentPropertyName;
        public MatchParentAttribute(string parentPropertyName)
        {
            ParentPropertyName = parentPropertyName;
        }
    }
}
