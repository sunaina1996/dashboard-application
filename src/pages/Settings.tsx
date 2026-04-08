import { useState } from "react";
import { Card, Heading, Input, Button } from "@sunaina-dev/ui-library";

export const Settings = () => {
  const [formData, setFormData] = useState({
    siteName: "Sunaina Dashboard",
    email: "admin@sunaina.com",
    timezone: "Asia/Kolkata",
  });

  const handleSave = () => {
    console.log("Saving:", formData);
  };

  return (
    <div className="space-y-6">
      <Heading level={3} title="Settings" className="text-gray-900" />
      <div className="px-6">
        <Card title="General Settings">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <Input
                  value={formData.siteName}
                  onChange={(e) =>
                    setFormData({ ...formData, siteName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) =>
                    setFormData({ ...formData, timezone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">
                    America/New York (EST)
                  </option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </select>
              </div>
          </div>

          <div className="pt-4 border-t">
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
      <div className="px-6">
        <Card title="Delete Account">
          <p className="text-sm text-gray-600 mb-4">
            Once you delete your account, there is no going back.
          </p>
          <Button variant="primary">Delete</Button>
        </Card>
      </div>
    </div>
  );
};
