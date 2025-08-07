import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Save, School, Bell, Shield, Database, Globe } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    // School Information
    schoolName: "Academic Excellence School",
    schoolAddress: "123 Education Street, Learning City",
    schoolPhone: "+1-555-0123",
    schoolEmail: "info@academicexcellence.edu",
    principalName: "Dr. Sarah Wilson",
    
    // System Settings
    academicYear: "2024-2025",
    timezone: "America/New_York",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    feeReminders: true,
    attendanceAlerts: true,
    
    // Security
    sessionTimeout: "30",
    passwordPolicy: "strong",
    twoFactorAuth: false,
    
    // Backup
    autoBackup: true,
    backupFrequency: "daily",
    retentionPeriod: "30"
  });

  const { toast } = useToast();

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    toast({
      title: "Settings Saved",
      description: "Your system settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure system preferences and school information</p>
        </div>
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="school" className="flex items-center gap-2">
            <School className="h-4 w-4" />
            School
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Backup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="school" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>School Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={settings.schoolName}
                    onChange={(e) => handleSettingChange("schoolName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="principalName">Principal Name</Label>
                  <Input
                    id="principalName"
                    value={settings.principalName}
                    onChange={(e) => handleSettingChange("principalName", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schoolAddress">School Address</Label>
                <Input
                  id="schoolAddress"
                  value={settings.schoolAddress}
                  onChange={(e) => handleSettingChange("schoolAddress", e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolPhone">Phone Number</Label>
                  <Input
                    id="schoolPhone"
                    value={settings.schoolPhone}
                    onChange={(e) => handleSettingChange("schoolPhone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolEmail">Email Address</Label>
                  <Input
                    id="schoolEmail"
                    type="email"
                    value={settings.schoolEmail}
                    onChange={(e) => handleSettingChange("schoolEmail", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    value={settings.academicYear}
                    onChange={(e) => handleSettingChange("academicYear", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleSettingChange("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange("dateFormat", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Fee Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send automatic fee payment reminders</p>
                </div>
                <Switch
                  checked={settings.feeReminders}
                  onCheckedChange={(checked) => handleSettingChange("feeReminders", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Attendance Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alert parents about student attendance</p>
                </div>
                <Switch
                  checked={settings.attendanceAlerts}
                  onCheckedChange={(checked) => handleSettingChange("attendanceAlerts", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select value={settings.passwordPolicy} onValueChange={(value) => handleSettingChange("passwordPolicy", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (6+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                      <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Backup Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Backup</Label>
                  <p className="text-sm text-muted-foreground">Enable automatic data backups</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                />
              </div>
              
              {settings.autoBackup && (
                <>
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="backupFrequency">Backup Frequency</Label>
                      <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange("backupFrequency", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retentionPeriod">Retention Period (days)</Label>
                      <Input
                        id="retentionPeriod"
                        type="number"
                        value={settings.retentionPeriod}
                        onChange={(e) => handleSettingChange("retentionPeriod", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline">Create Backup Now</Button>
                    <Button variant="outline">View Backup History</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}