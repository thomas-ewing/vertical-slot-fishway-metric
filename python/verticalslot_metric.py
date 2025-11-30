import numpy as np

def two_point_set_transfer_function(fish_size, obs_value, tf_size, tf_full_fxn, tf_no_fxn):
    
    # determine if the transfer function returns full function at high observed value
    
    high_good = np.all((tf_full_fxn-tf_no_fxn)>0)
    
    interp_full_fxn_TDR = np.interp(fish_size, tf_size, tf_full_fxn)
    interp_no_fxn_TDR = np.interp(fish_size, tf_size, tf_no_fxn)
    
    if high_good:
        return np.interp(obs_value, np.array([interp_no_fxn_TDR, interp_full_fxn_TDR]), np.array([0.0,1.0]))
    else:
        return np.interp(obs_value, np.array([interp_full_fxn_TDR,interp_no_fxn_TDR]), np.array([1.0,0.0]))
    
headloss_transfer_function_size = np.array([20,50,100,200,400,700,1500])
headloss_transfer_function_full_function = np.array([85, 110, 140, 160, 180, 200, 200])
headloss_transfer_function_no_function = np.array([120, 150, 200, 250, 320, 350, 350])

def calc_headloss_metric(fish_size, obs_value):
    
    return two_point_set_transfer_function(fish_size,
                                           obs_value,
                                           headloss_transfer_function_size,
                                           headloss_transfer_function_full_function,
                                           headloss_transfer_function_no_function)

turbulence_transfer_function_size = np.array([20,50,100,200,700,1500])
turbulence_transfer_function_full_function = np.array([10, 45, 70, 95, 110, 110])
turbulence_transfer_function_no_function = np.array([30, 65, 90, 115, 150, 150])

def calc_turb_metric(fish_size, obs_value):
    
    return two_point_set_transfer_function(fish_size,
                                           obs_value,
                                           turbulence_transfer_function_size,
                                           turbulence_transfer_function_full_function,
                                           turbulence_transfer_function_no_function)

mindepth_transfer_function_size = np.array([20,100,200,300,400,700,1500])
mindepth_transfer_function_full_function = np.array([0.3,0.3,0.3,0.3,0.4,0.7,1.5])
mindepth_transfer_function_no_function = np.array([0.2,0.2,0.2,0.2,0.2,0.35,0.75])

def calc_depth_metric(fish_size, obs_value):
    
    return two_point_set_transfer_function(fish_size,
                                           obs_value,
                                           mindepth_transfer_function_size,
                                           mindepth_transfer_function_full_function,
                                           mindepth_transfer_function_no_function)

slotwidth_transfer_function_size = np.array([20,100,200,700,1500])
slotwidth_transfer_function_full_function = np.array([4, 20, 40, 140, 300])
slotwidth_transfer_function_no_function = np.array([3.2, 16, 32, 112, 240])

def calc_width_metric(fish_size, obs_value):
    
    return two_point_set_transfer_function(fish_size,
                                           obs_value,
                                           slotwidth_transfer_function_size,
                                           slotwidth_transfer_function_full_function,
                                           slotwidth_transfer_function_no_function)

alt_entryslot_transfer_function_size = np.array([20,1500])
alt_entryslot_transfer_function_full_function = np.array([1.0, 1.0])
alt_entryslot_transfer_function_no_function = np.array([0.3, 0.3])

def calc_entry_velocity_metric(fish_size, obs_value):
    
    return two_point_set_transfer_function(fish_size,
                                           obs_value,
                                           alt_entryslot_transfer_function_size,
                                           alt_entryslot_transfer_function_full_function,
                                           alt_entryslot_transfer_function_no_function)