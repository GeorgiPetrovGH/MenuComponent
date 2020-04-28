using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MenuComponent.App
{
    public class TaskTab
    {
        public string DisplayName { get; set; }

        public ICollection<TaskTab> NestedTabs { get; set; }
    }
}
