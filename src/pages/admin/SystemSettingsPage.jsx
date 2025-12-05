import { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";

const SystemSettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general"); // general, email, payment, features
  const [settings, setSettings] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Mock settings data
  const getMockSettings = () => ({
    general: {
      platformName: "EventSphere",
      platformEmail: "admin@eventsphere.lk",
      supportEmail: "support@eventsphere.lk",
      eventApprovalRequired: true,
      autoApproveOrganizers: false,
      maxEventsPerOrganizer: 10,
      maxCapacityPerEvent: 5000,
      bookingCancelationPeriod: 24, // hours
      platformFeePercentage: 10,
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUsername: "noreply@eventsphere.lk",
      smtpPassword: "**********",
      emailFromName: "EventSphere",
      emailFromAddress: "noreply@eventsphere.lk",
      enableBookingConfirmation: true,
      enableEventApprovalNotification: true,
      enableReminderEmails: true,
      reminderHoursBefore: 24,
    },
    payment: {
      provider: "PayHere",
      merchantId: "MERCH_12345",
      merchantSecret: "********************",
      apiKey: "********************",
      sandboxMode: true,
      currency: "LKR",
      enableInstantPayouts: false,
      minimumPayoutAmount: 1000,
      payoutSchedule: "weekly", // daily, weekly, monthly
    },
    features: {
      enableUserRegistration: true,
      enableGuestBooking: false,
      enableEventReviews: true,
      enableSocialSharing: true,
      enableQRCodeTickets: true,
      enableAnalytics: true,
      enableNotifications: true,
      maintenanceMode: false,
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSettings(getMockSettings());
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Settings saved successfully!");
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetSettings = () => {
    if (
      confirm("Are you sure you want to reset all settings to default values?")
    ) {
      setSettings(getMockSettings());
      setHasChanges(false);
    }
  };

  if (loading && !settings) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              System Settings
            </h1>
            <p className="text-gray-600">
              Configure platform settings and preferences
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handleResetSettings}
              disabled={saving}
            >
              Reset to Default
            </Button>
            <Button
              onClick={handleSaveSettings}
              disabled={!hasChanges || saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasChanges && (
        <Card className="mb-6 border-l-4 border-yellow-500 bg-yellow-50">
          <div className="p-4 flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-gray-900">Unsaved Changes</h3>
              <p className="text-sm text-gray-600">
                You have unsaved changes. Don't forget to save before leaving
                this page.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {["general", "email", "payment", "features"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* General Settings Tab */}
      {activeTab === "general" && settings && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Platform Information
              </h2>
              <div className="space-y-4">
                <Input
                  label="Platform Name"
                  value={settings.general.platformName}
                  onChange={(e) =>
                    handleInputChange("general", "platformName", e.target.value)
                  }
                />
                <Input
                  label="Platform Email"
                  type="email"
                  value={settings.general.platformEmail}
                  onChange={(e) =>
                    handleInputChange(
                      "general",
                      "platformEmail",
                      e.target.value
                    )
                  }
                />
                <Input
                  label="Support Email"
                  type="email"
                  value={settings.general.supportEmail}
                  onChange={(e) =>
                    handleInputChange("general", "supportEmail", e.target.value)
                  }
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Event Settings
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Require Event Approval
                    </div>
                    <div className="text-sm text-gray-600">
                      All events must be approved by admin before going live
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.general.eventApprovalRequired}
                    onChange={(e) =>
                      handleInputChange(
                        "general",
                        "eventApprovalRequired",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Auto-Approve Organizers
                    </div>
                    <div className="text-sm text-gray-600">
                      Automatically approve new organizer registrations
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.general.autoApproveOrganizers}
                    onChange={(e) =>
                      handleInputChange(
                        "general",
                        "autoApproveOrganizers",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Max Events Per Organizer"
                    type="number"
                    value={settings.general.maxEventsPerOrganizer}
                    onChange={(e) =>
                      handleInputChange(
                        "general",
                        "maxEventsPerOrganizer",
                        parseInt(e.target.value)
                      )
                    }
                  />
                  <Input
                    label="Max Capacity Per Event"
                    type="number"
                    value={settings.general.maxCapacityPerEvent}
                    onChange={(e) =>
                      handleInputChange(
                        "general",
                        "maxCapacityPerEvent",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Booking & Payment Settings
              </h2>
              <div className="space-y-4">
                <Input
                  label="Booking Cancellation Period (hours)"
                  type="number"
                  value={settings.general.bookingCancelationPeriod}
                  onChange={(e) =>
                    handleInputChange(
                      "general",
                      "bookingCancelationPeriod",
                      parseInt(e.target.value)
                    )
                  }
                  helperText="Minimum hours before event to allow cancellations"
                />
                <Input
                  label="Platform Fee Percentage (%)"
                  type="number"
                  value={settings.general.platformFeePercentage}
                  onChange={(e) =>
                    handleInputChange(
                      "general",
                      "platformFeePercentage",
                      parseInt(e.target.value)
                    )
                  }
                  helperText="Percentage of ticket price retained as platform fee"
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Email Settings Tab */}
      {activeTab === "email" && settings && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                SMTP Configuration
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="SMTP Host"
                    value={settings.email.smtpHost}
                    onChange={(e) =>
                      handleInputChange("email", "smtpHost", e.target.value)
                    }
                  />
                  <Input
                    label="SMTP Port"
                    type="number"
                    value={settings.email.smtpPort}
                    onChange={(e) =>
                      handleInputChange(
                        "email",
                        "smtpPort",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <Input
                  label="SMTP Username"
                  value={settings.email.smtpUsername}
                  onChange={(e) =>
                    handleInputChange("email", "smtpUsername", e.target.value)
                  }
                />
                <Input
                  label="SMTP Password"
                  type="password"
                  value={settings.email.smtpPassword}
                  onChange={(e) =>
                    handleInputChange("email", "smtpPassword", e.target.value)
                  }
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Email From Settings
              </h2>
              <div className="space-y-4">
                <Input
                  label="From Name"
                  value={settings.email.emailFromName}
                  onChange={(e) =>
                    handleInputChange("email", "emailFromName", e.target.value)
                  }
                />
                <Input
                  label="From Email Address"
                  type="email"
                  value={settings.email.emailFromAddress}
                  onChange={(e) =>
                    handleInputChange(
                      "email",
                      "emailFromAddress",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Email Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Booking Confirmation Emails
                    </div>
                    <div className="text-sm text-gray-600">
                      Send email when booking is confirmed
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.email.enableBookingConfirmation}
                    onChange={(e) =>
                      handleInputChange(
                        "email",
                        "enableBookingConfirmation",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Event Approval Notifications
                    </div>
                    <div className="text-sm text-gray-600">
                      Notify organizers when events are approved/rejected
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.email.enableEventApprovalNotification}
                    onChange={(e) =>
                      handleInputChange(
                        "email",
                        "enableEventApprovalNotification",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Event Reminder Emails
                    </div>
                    <div className="text-sm text-gray-600">
                      Send reminder emails before events
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.email.enableReminderEmails}
                    onChange={(e) =>
                      handleInputChange(
                        "email",
                        "enableReminderEmails",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                {settings.email.enableReminderEmails && (
                  <Input
                    label="Send Reminder (hours before event)"
                    type="number"
                    value={settings.email.reminderHoursBefore}
                    onChange={(e) =>
                      handleInputChange(
                        "email",
                        "reminderHoursBefore",
                        parseInt(e.target.value)
                      )
                    }
                  />
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Payment Settings Tab */}
      {activeTab === "payment" && settings && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Payment Gateway Configuration
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Provider
                  </label>
                  <select
                    value={settings.payment.provider}
                    onChange={(e) =>
                      handleInputChange("payment", "provider", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="PayHere">PayHere</option>
                    <option value="Stripe">Stripe</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>

                <Input
                  label="Merchant ID"
                  value={settings.payment.merchantId}
                  onChange={(e) =>
                    handleInputChange("payment", "merchantId", e.target.value)
                  }
                />
                <Input
                  label="Merchant Secret"
                  type="password"
                  value={settings.payment.merchantSecret}
                  onChange={(e) =>
                    handleInputChange(
                      "payment",
                      "merchantSecret",
                      e.target.value
                    )
                  }
                />
                <Input
                  label="API Key"
                  type="password"
                  value={settings.payment.apiKey}
                  onChange={(e) =>
                    handleInputChange("payment", "apiKey", e.target.value)
                  }
                />

                <div className="flex items-center justify-between py-3 border-t border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Sandbox Mode
                    </div>
                    <div className="text-sm text-gray-600">
                      Enable test mode for payments
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.payment.sandboxMode}
                    onChange={(e) =>
                      handleInputChange(
                        "payment",
                        "sandboxMode",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <Input
                  label="Currency"
                  value={settings.payment.currency}
                  onChange={(e) =>
                    handleInputChange("payment", "currency", e.target.value)
                  }
                  helperText="Default currency code (e.g., LKR, USD)"
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Payout Settings
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Enable Instant Payouts
                    </div>
                    <div className="text-sm text-gray-600">
                      Transfer funds immediately after events
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.payment.enableInstantPayouts}
                    onChange={(e) =>
                      handleInputChange(
                        "payment",
                        "enableInstantPayouts",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <Input
                  label="Minimum Payout Amount (LKR)"
                  type="number"
                  value={settings.payment.minimumPayoutAmount}
                  onChange={(e) =>
                    handleInputChange(
                      "payment",
                      "minimumPayoutAmount",
                      parseInt(e.target.value)
                    )
                  }
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payout Schedule
                  </label>
                  <select
                    value={settings.payment.payoutSchedule}
                    onChange={(e) =>
                      handleInputChange(
                        "payment",
                        "payoutSchedule",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Features Settings Tab */}
      {activeTab === "features" && settings && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Platform Features
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      User Registration
                    </div>
                    <div className="text-sm text-gray-600">
                      Allow new users to register
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.features.enableUserRegistration}
                    onChange={(e) =>
                      handleInputChange(
                        "features",
                        "enableUserRegistration",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Guest Booking
                    </div>
                    <div className="text-sm text-gray-600">
                      Allow booking without registration
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.features.enableGuestBooking}
                    onChange={(e) =>
                      handleInputChange(
                        "features",
                        "enableGuestBooking",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Event Reviews
                    </div>
                    <div className="text-sm text-gray-600">
                      Allow users to rate and review events
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.features.enableEventReviews}
                    onChange={(e) =>
                      handleInputChange(
                        "features",
                        "enableEventReviews",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Social Sharing
                    </div>
                    <div className="text-sm text-gray-600">
                      Enable social media sharing buttons
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.features.enableSocialSharing}
                    onChange={(e) =>
                      handleInputChange(
                        "features",
                        "enableSocialSharing",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      QR Code Tickets
                    </div>
                    <div className="text-sm text-gray-600">
                      Generate QR codes for ticket validation
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.features.enableQRCodeTickets}
                    onChange={(e) =>
                      handleInputChange(
                        "features",
                        "enableQRCodeTickets",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">Analytics</div>
                    <div className="text-sm text-gray-600">
                      Enable analytics and reporting features
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.features.enableAnalytics}
                    onChange={(e) =>
                      handleInputChange(
                        "features",
                        "enableAnalytics",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">
                      Push Notifications
                    </div>
                    <div className="text-sm text-gray-600">
                      Enable in-app notifications
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.features.enableNotifications}
                    onChange={(e) =>
                      handleInputChange(
                        "features",
                        "enableNotifications",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-red-600">
                      Maintenance Mode
                    </div>
                    <div className="text-sm text-gray-600">
                      Disable the platform for maintenance (admins only)
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.features.maintenanceMode}
                    onChange={(e) =>
                      handleInputChange(
                        "features",
                        "maintenanceMode",
                        e.target.checked
                      )
                    }
                    className="w-6 h-6 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Save Button (Fixed at bottom) */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              You have unsaved changes
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setSettings(getMockSettings());
                  setHasChanges(false);
                }}
                disabled={saving}
              >
                Discard
              </Button>
              <Button onClick={handleSaveSettings} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettingsPage;
