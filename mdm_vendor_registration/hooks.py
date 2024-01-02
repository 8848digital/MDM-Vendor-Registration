app_name = "mdm_vendor_registration"
app_title = "Mdm Vendor Registration"
app_publisher = "chintan"
app_description = "mdm"
app_email = "chintan@8848digital.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/mdm_vendor_registration/css/mdm_vendor_registration.css"
# app_include_js = "/assets/mdm_vendor_registration/js/mdm_vendor_registration.js"

# include js, css files in header of web template
# web_include_css = "/assets/mdm_vendor_registration/css/mdm_vendor_registration.css"
# web_include_js = "/assets/mdm_vendor_registration/js/mdm_vendor_registration.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "mdm_vendor_registration/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}
# Home Pages
# ----------
# application home page (will override Website Settings)
#home_page = "signup"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "mdm_vendor_registration.utils.jinja_methods",
#	"filters": "mdm_vendor_registration.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "mdm_vendor_registration.install.before_install"
# after_install = "mdm_vendor_registration.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "mdm_vendor_registration.uninstall.before_uninstall"
# after_uninstall = "mdm_vendor_registration.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "mdm_vendor_registration.utils.before_app_install"
# after_app_install = "mdm_vendor_registration.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "mdm_vendor_registration.utils.before_app_uninstall"
# after_app_uninstall = "mdm_vendor_registration.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "mdm_vendor_registration.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"mdm_vendor_registration.tasks.all"
#	],
#	"daily": [
#		"mdm_vendor_registration.tasks.daily"
#	],
#	"hourly": [
#		"mdm_vendor_registration.tasks.hourly"
#	],
#	"weekly": [
#		"mdm_vendor_registration.tasks.weekly"
#	],
#	"monthly": [
#		"mdm_vendor_registration.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "mdm_vendor_registration.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "mdm_vendor_registration.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "mdm_vendor_registration.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["mdm_vendor_registration.utils.before_request"]
# after_request = ["mdm_vendor_registration.utils.after_request"]

# Job Events
# ----------
# before_job = ["mdm_vendor_registration.utils.before_job"]
# after_job = ["mdm_vendor_registration.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"mdm_vendor_registration.auth.validate"
# ]
