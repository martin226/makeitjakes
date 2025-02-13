# Set up Gemfile path
ENV["BUNDLE_GEMFILE"] ||= File.expand_path("../Gemfile", __dir__)

# Set up gems listed in the Gemfile
require "bundler/setup"
require "bootsnap/setup" # Speed up boot time by caching expensive operations

# Only require the frameworks we need
require "action_controller/railtie"
require "action_view/railtie"
require "rails/test_unit/railtie"
require "action_cable/engine"

# Require the gems listed in Gemfile
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version
    config.load_defaults 8.0

    # Autoload lib directory
    config.autoload_lib(ignore: %w[assets tasks])

    # Configure timezone if needed
    # config.time_zone = "UTC"
  end
end

# Initialize the Rails application
Rails.application.initialize!
